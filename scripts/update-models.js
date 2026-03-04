#!/usr/bin/env node
/**
 * Scheduled update: fetches current Gemini model list via Gemini API (using the
 * gemini-models-update skill rules), then updates README.md and docs/index.html.
 * Usage: GEMINI_API_KEY=... node scripts/update-models.js
 * Optional: GEMINI_UPDATE_MODEL=gemini-2.0-flash (default)
 */

const fs = require('fs').promises;
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKILL_PATH = path.join(ROOT, '.cursor/skills/gemini-models-update/SKILL.md');
const README_PATH = path.join(ROOT, 'README.md');
const DOCS_INDEX_PATH = path.join(ROOT, 'docs/index.html');

const SPEED_TO_NUM = { Low: 1, Medium: 2, High: 3, 'Very High': 4 };

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
      "context": "1M",
      "priceDisplay": "~$7",
      "priceSort": 7,
      "purpose": "Flagship for complex reasoning, agents, advanced coding"
    }
  ]
}
- "speed" must be exactly one of: Low, Medium, High, Very High.
- "priceSort" is numeric for sorting (e.g. 7, 0.7, 0.15).
- "model" is the exact API/Vertex name (will be rendered bold in the table).
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

async function loadSkill() {
  const content = await fs.readFile(SKILL_PATH, 'utf8');
  return content + '\n\n' + JSON_OUTPUT_INSTRUCTION;
}

async function callGemini(skillContent) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required');
  }
  const modelId = process.env.GEMINI_UPDATE_MODEL || 'gemini-2.0-flash';

  const { GoogleGenerativeAI } = require('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: skillContent,
  });

  const result = await model.generateContent(
    'Update the Gemini model comparison table for today. Use the sources and rules in your instructions. Return only the JSON object.'
  );
  const response = result.response;
  if (!response || !response.text) {
    throw new Error('No text in Gemini response');
  }
  return response.text();
}

function buildReadmeTable(rows) {
  const header =
    '| Model | Speed | Intelligence (1–10) | Context | Price / 1M tokens (input) | Purpose & use cases |\n' +
    '|-------|-------|----------------------|---------|----------------------------|----------------------|';
  const body = rows
    .map(
      (r) =>
        `| **${r.model}** | ${r.speed} | ${r.intelligence} | ${r.context} | ${r.priceDisplay} | ${r.purpose} |`
    )
    .join('\n');
  return header + '\n' + body;
}

const LEGEND =
  '**Intelligence (1–10)** = ordinal ranking (10 = strongest, 1 = lightest). Relative order based on [Artificial Analysis](https://www.artificialanalysis.ai/) and model tier. **Price** = approximate list price per 1M input tokens; check [Google AI](https://ai.google.dev/pricing) or [Vertex AI](https://cloud.google.com/vertex-ai/pricing) for current pricing.';

function buildHtmlTbody(rows) {
  return rows
    .map((r) => {
      const dataSpeed = SPEED_TO_NUM[r.speed] ?? 2;
      const dataIntelligence = Number(r.intelligence);
      const dataPrice = Number(r.priceSort);
      return (
        `          <tr data-speed="${dataSpeed}" data-intelligence="${dataIntelligence}" data-price="${dataPrice}">\n` +
        `            <td><strong>${escapeHtml(r.model)}</strong></td>\n` +
        `            <td>${escapeHtml(r.speed)}</td>\n` +
        `            <td>${dataIntelligence}</td>\n` +
        `            <td>${escapeHtml(r.context)}</td>\n` +
        `            <td>${escapeHtml(r.priceDisplay)}</td>\n` +
        `            <td>${escapeHtml(r.purpose)}</td>\n` +
        '          </tr>'
      );
    })
    .join('\n');
}

async function updateReadme(data) {
  const asOfDate = data.asOfDate;
  const table = buildReadmeTable(data.rows);
  const comparisonBlock =
    '## Comparison: All models\n\n' + table + '\n\n' + LEGEND + '\n\n---\n\n';

  let readme = await fs.readFile(README_PATH, 'utf8');

  const comparisonStart = readme.indexOf('## Comparison: All models');
  const sourcesStart = readme.indexOf('\n\n## Sources');
  if (comparisonStart === -1 || sourcesStart === -1) {
    throw new Error('README structure changed: could not find Comparison or Sources');
  }
  readme =
    readme.slice(0, comparisonStart) +
    comparisonBlock +
    readme.slice(sourcesStart);

  readme = readme.replace(
    /\(as of [^)]+\)/i,
    `(as of ${asOfDate})`
  );
  readme = readme.replace(
    /(Information is based on[^.]*\.) As of [^.]*\./,
    `$1 As of ${asOfDate}.`
  );

  await fs.writeFile(README_PATH, readme, 'utf8');
}

async function updateDocsIndex(data) {
  const asOfDate = data.asOfDate;
  const tbodyHtml = buildHtmlTbody(data.rows);

  let html = await fs.readFile(DOCS_INDEX_PATH, 'utf8');

  html = html.replace(
    /<tbody>[\s\S]*?<\/tbody>/,
    '<tbody>\n' + tbodyHtml + '\n        </tbody>'
  );

  html = html.replace(
    /(Overview of <strong>all public Google Gemini models<\/strong> \(as of )([^)]+)(\))/,
    `$1${asOfDate}$3`
  );
  html = html.replace(
    /(Information is based on[^.]*\.) As of [^.]*\./,
    `$1 As of ${asOfDate}.`
  );

  await fs.writeFile(DOCS_INDEX_PATH, html, 'utf8');
}

async function main() {
  try {
    const skillContent = await loadSkill();
    const rawText = await callGemini(skillContent);
    const data = extractJson(rawText);

    if (!data.rows || !Array.isArray(data.rows) || data.rows.length === 0) {
      throw new Error('Invalid JSON: missing or empty "rows" array');
    }
    if (!data.asOfDate || typeof data.asOfDate !== 'string') {
      throw new Error('Invalid JSON: missing or invalid "asOfDate"');
    }

    await updateReadme(data);
    await updateDocsIndex(data);

    console.log('Updated README.md and docs/index.html (as of ' + data.asOfDate + ')');
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
}

main();
