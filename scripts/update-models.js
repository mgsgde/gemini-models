#!/usr/bin/env node
/**
 * Scheduled update: fetches current Gemini model list via Gemini API (using the
 * gemini-models-update skill rules), then updates README.md and docs/index.html.
 * Uses Google Search grounding so the model can look up current models/pricing from
 * official docs (ai.google.dev, cloud.google.com).
 *
 * Model: We always use Gemini 3 Flash Preview (gemini-3-flash-preview). This is
 * intentional and must not be overridden via environment variable—do not add
 * GEMINI_UPDATE_MODEL or similar; keep UPDATE_MODEL as the single source of truth.
 *
 * Loads GEMINI_API_KEY from .env in project root if present.
 * Usage: npm run update-models  or  GEMINI_API_KEY=... node scripts/update-models.js
 */

const path = require('path');
const ROOT = path.resolve(__dirname, '..');
require('dotenv').config({ path: path.join(ROOT, '.env') });

const fs = require('fs').promises;
const SKILL_PATH = path.join(ROOT, '.cursor/skills/gemini-models-update/SKILL.md');
const README_PATH = path.join(ROOT, 'README.md');
const DOCS_INDEX_PATH = path.join(ROOT, 'docs/index.html');
const SOURCES_JSON_PATH = path.join(ROOT, 'sources.json');

/** !important Always use Gemini 3 Flash Preview. Do not make this configurable via env. */
const UPDATE_MODEL = 'gemini-3-flash-preview';

const SPEED_TO_NUM = { Low: 1, Medium: 2, High: 3, 'Very High': 4 };

/** Fallback when no grounding metadata and no sources.json (e.g. first run). */
const FALLBACK_SOURCES = [
  { url: 'https://ai.google.dev/gemini-api/docs/models', title: 'Models — Gemini API | Google AI for Developers' },
  { url: 'https://ai.google.dev/gemini-api/docs/changelog', title: 'Release notes | Gemini API' },
  { url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/models', title: 'Vertex AI Gemini models' },
  { url: 'https://www.artificialanalysis.ai/', title: 'Artificial Analysis — Intelligence Index' },
];

const JSON_OUTPUT_INSTRUCTION = `
Respond with exactly one JSON object and no other text. No markdown, no code fence.
Schema:
{
  "asOfDate": "March 2026",
  "rows": [
    {
      "model": "Gemini 3.1 Pro",
      "speed": "Low",
      "intelligence": 10,
      "priceDisplay": "~$7",
      "priceSort": 7,
      "releaseDate": "Dec 2024",
      "releaseDateSort": 202412,
      "purpose": "Flagship for complex reasoning, agents, advanced coding"
    }
  ]
}
- "speed" must be exactly one of: Low, Medium, High, Very High.
- "priceSort" is numeric for sorting (e.g. 7, 0.7, 0.15).
- "model" is the exact API/Vertex name (will be rendered bold in the table).
- "releaseDate": human-readable (e.g. "Dec 2024", "Feb 2025"). "releaseDateSort": YYYYMM number for sorting (e.g. 202412).
`;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function extractJson(text) {
  const trimmed = text.trim();
  const codeBlock = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/m);
  const raw = codeBlock ? codeBlock[1].trim() : trimmed;
  return JSON.parse(raw);
}

/**
 * Extract source URLs and titles from grounding metadata.
 * SDK typo: groundingChuncks (not groundingChunks).
 * @returns { Array<{ url: string, title?: string }> }
 */
function extractSourcesFromGrounding(groundingMetadata) {
  if (!groundingMetadata) return [];
  const chunks = groundingMetadata.groundingChuncks || groundingMetadata.groundingChunks || [];
  const seen = new Set();
  const out = [];
  for (const chunk of chunks) {
    const uri = chunk.web?.uri;
    if (!uri || seen.has(uri)) continue;
    seen.add(uri);
    out.push({ url: uri, title: chunk.web?.title || undefined });
  }
  return out;
}

async function loadPersistedSources() {
  try {
    const raw = await fs.readFile(SOURCES_JSON_PATH, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data.sources) ? data.sources : [];
  } catch {
    return [];
  }
}

async function writePersistedSources(asOfDate, sources) {
  await fs.writeFile(
    SOURCES_JSON_PATH,
    JSON.stringify({ asOfDate, sources }, null, 2),
    'utf8'
  );
}

async function loadSkill() {
  const content = await fs.readFile(SKILL_PATH, 'utf8');
  return content + '\n\n' + JSON_OUTPUT_INSTRUCTION;
}

async function callGemini(skillContent, persistedSources = []) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required');
  }
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const supportsThinking = /2\.5|3\./.test(UPDATE_MODEL);
  const model = genAI.getGenerativeModel({
    model: UPDATE_MODEL,
    systemInstruction: skillContent,
    tools: [{ googleSearch: {} }],
    ...(supportsThinking && {
      generationConfig: {
        thinkingConfig: { thinkingBudget: 16384 },
      },
    }),
  });

  let prompt = `Update the Gemini model comparison table for today.

Include all public Gemini models that are still available (Gemini 2.0, 2.5, 3.x, etc.). Do not limit the table to the latest generation only—list every model offered in the API/Vertex docs.

Use Google Search to find current Gemini/Vertex documentation, pricing pages, Artificial Analysis (intelligence ordering), release notes, and official blog posts.`;
  if (persistedSources.length > 0) {
    const hint = persistedSources.map((s) => `- ${s.url}`).join('\n');
    prompt += `

Previously used sources (verify and update if still relevant):\n${hint}`;
  }
  prompt += `

From the API/Vertex docs: model names and context. From the pricing pages: price per 1M input tokens. From Artificial Analysis: intelligence ordering (ordinal 1–10). From the blogs and release notes: new models, use-case positioning, and release date per model (use release notes / changelog for dates). Include "releaseDate" (e.g. "Dec 2024") and "releaseDateSort" (YYYYMM number) for each row.

Return only the JSON object, no other text.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  if (!response || !response.text) {
    throw new Error('No text in Gemini response');
  }
  const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
  return { text: response.text(), groundingMetadata };
}

/** Short link text for sources: use title if domain-like, else hostname from URL. */
function sourceLinkText(s) {
  if (s.title && s.title.length < 60 && !/\s{2,}/.test(s.title)) {
    const t = s.title.replace(/^https?:\/\//i, '').split('/')[0].replace(/^www\./, '');
    if (t.length <= 30) return t;
  }
  try {
    const u = new URL(s.url);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return s.url.length > 40 ? s.url.slice(0, 37) + '...' : s.url;
  }
}

function buildSourcesSectionHtml(asOfDate, sources) {
  const items = sources
    .map(
      (s) =>
        `          <li><a href="${escapeHtml(s.url)}">${escapeHtml(sourceLinkText(s))}</a></li>`
    )
    .join('\n');
  return (
    `      <section class="sources">\n        <h2>Sources</h2>\n        <p>Information is based on official Google publications (purpose, context window) and the Artificial Analysis Intelligence Index for the intelligence score. As of ${asOfDate}.</p>\n        <ul>\n` +
    items +
    '\n        </ul>\n      </section>'
  );
}

function buildHtmlTbody(rows) {
  return rows
    .map((r) => {
      const dataSpeed = SPEED_TO_NUM[r.speed] ?? 2;
      const dataIntelligence = Number(r.intelligence);
      const dataPrice = Number(r.priceSort);
      const dataRelease = Number(r.releaseDateSort) || 0;
      return (
        `          <tr data-speed="${dataSpeed}" data-intelligence="${dataIntelligence}" data-price="${dataPrice}" data-release="${dataRelease}">\n` +
        `            <td><strong>${escapeHtml(r.model)}</strong></td>\n` +
        `            <td>${escapeHtml(r.speed)}</td>\n` +
        `            <td>${dataIntelligence}</td>\n` +
        `            <td>${escapeHtml(r.priceDisplay)}</td>\n` +
        `            <td>${escapeHtml(r.releaseDate || '—')}</td>\n` +
        `            <td>${escapeHtml(r.purpose)}</td>\n` +
        '          </tr>'
      );
    })
    .join('\n');
}

async function updateReadme(data) {
  const asOfDate = data.asOfDate;
  let readme = await fs.readFile(README_PATH, 'utf8');
  readme = readme.replace(/\bAs of [A-Za-z]+ \d{4}\b/, `As of ${asOfDate}`);
  await fs.writeFile(README_PATH, readme, 'utf8');
}

async function updateDocsIndex(data, sources) {
  const asOfDate = data.asOfDate;
  const tbodyHtml = buildHtmlTbody(data.rows);
  const sourcesSectionHtml = buildSourcesSectionHtml(asOfDate, sources);

  let html = await fs.readFile(DOCS_INDEX_PATH, 'utf8');

  html = html.replace(
    /<tbody>[\s\S]*?<\/tbody>/,
    '<tbody>\n' + tbodyHtml + '\n        </tbody>'
  );

  html = html.replace(
    /(Sortable comparison table\. As of )[^.<]+(\.)/,
    `$1${asOfDate}$2`
  );

  html = html.replace(
    /(Overview of <strong>all public Google Gemini models<\/strong> \(as of )([^)]+)(\))/,
    `$1${asOfDate}$3`
  );

  html = html.replace(
    /<section class="sources">[\s\S]*?<\/section>/,
    sourcesSectionHtml
  );

  await fs.writeFile(DOCS_INDEX_PATH, html, 'utf8');
}

async function main() {
  try {
    const persistedSources = await loadPersistedSources();
    const skillContent = await loadSkill();
    const { text: rawText, groundingMetadata } = await callGemini(
      skillContent,
      persistedSources
    );
    const data = extractJson(rawText);

    if (!data.rows || !Array.isArray(data.rows) || data.rows.length === 0) {
      throw new Error('Invalid JSON: missing or empty "rows" array');
    }
    if (!data.asOfDate || typeof data.asOfDate !== 'string') {
      throw new Error('Invalid JSON: missing or invalid "asOfDate"');
    }

    let sources = extractSourcesFromGrounding(groundingMetadata);
    if (sources.length > 0) {
      await writePersistedSources(data.asOfDate, sources);
    } else {
      sources = persistedSources.length > 0 ? persistedSources : FALLBACK_SOURCES;
    }

    await updateReadme(data);
    await updateDocsIndex(data, sources);

    console.log('Updated README.md and docs/index.html (as of ' + data.asOfDate + ')');
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
}

main();
