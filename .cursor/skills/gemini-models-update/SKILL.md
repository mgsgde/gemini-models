---
name: gemini-models-update
description: Updates the Gemini model comparison table in this repo from official Google docs and blog posts. Use when updating the model list, refreshing README tables, adding new Gemini models, or syncing with Gemini API/Vertex AI documentation.
---

# Gemini Models List Update

Keeps the repository’s Gemini model overview (README.md) in sync with official Google sources. The list lives in **README.md** as a single Markdown table.

**README and docs must always be consistent.** The same content (intro, table, legend, sources, date, license) appears in **README.md** and in **docs/** (GitHub Pages site). When you update the model list or any of that content, update **both** README and docs so they stay in sync.

## Where to update

- **README.md** (repository root): Section **"Comparison: All models"** — one table; plus intro, legend, Sources, License & usage, "As of" date.
- **docs/index.html** (and docs/style.css if needed): Same intro text, same table (with sortable headers), same legend, same **Sources** section (same links and "As of" date), same **License & usage**. Table rows and `data-speed` / `data-intelligence` / `data-price` / `data-release` must match the README table.

## Table format

Exact header and column order (keep alignment):

```markdown
| Model | Speed | Intelligence (1–10) | Price / 1M tokens (input) | Release | Purpose & use cases |
|-------|-------|----------------------|----------------------------|---------|----------------------|
```

- **Model**: Exact name from API/Vertex docs (e.g. "Gemini 3.1 Pro", "Gemini 3 Flash"). Use **bold** in Markdown.
- **Speed**: One of `Low` | `Medium` | `High` | `Very High` (from docs or blog positioning).
- **Intelligence (1–10)**: Ordinal ranking only. 10 = strongest, 1 = lightest. Relative order from [Artificial Analysis](https://www.artificialanalysis.ai/) where available (exact scores: Gemini 3 Flash, 2.5 Pro); otherwise ordinal by model tier. Flash-Lite: estimate from tier and benchmark deltas; do not invent raw benchmark numbers.
- **Price / 1M tokens (input)**: Approximate list price, format `~$X.XX` or `~$X`. Source: [Google AI Pricing](https://ai.google.dev/pricing), [Vertex AI Pricing](https://cloud.google.com/vertex-ai/pricing).
- **Release**: Release date per model, e.g. "Dec 2024" or "Feb 2025". Source: [Release notes \| Gemini API](https://ai.google.dev/gemini-api/docs/changelog), blog announcements.
- **Purpose & use cases**: Short phrase (e.g. "Flagship for complex reasoning, agents, advanced coding").

## Workflow

1. **Fetch current model set**  
   Check **Gemini API Model Documentation** and **Vertex AI Model Garden** (see **Sources** below) for the list of current models and their names.

2. **Fill each column** from the right sources:
   - **Model** → API docs or Vertex docs.
   - **Speed, Purpose & use cases** → Vertex Model Garden or blog announcements (1.5, 2.0, 2.5, 3.x).
   - **Intelligence (1–10)** → Ordinal 1–10 only. Use Artificial Analysis order where published; for others maintain consistent ordinal by tier (Pro > Flash > Flash-Lite within same generation). Do not insert raw MMLU/GPQA into this column.
   - **Price** → Google AI or Vertex pricing pages; use approximate values and "~".
   - **Release** → Release notes / changelog or blog; use short form (e.g. "Dec 2024").

3. **Keep legend and Sources**  
   In README: keep the paragraph under the table and the **Sources** section; set the "As of" date (e.g. "March 2026").

4. **Keep README and docs identical**  
   Update **docs/index.html** so it matches README: same intro, same table (same rows and data attributes for sorting), same legend text, same **Sources** list and date, same **License & usage**. README and docs must always stay consistent.

## Rules

- **Only use official or stated sources.** Prefer API docs and Vertex docs; use blog announcements for positioning and new models.
- **Intelligence is ordinal only.** No raw benchmark numbers (MMLU, GPQA) in the table; only 1–10 ranking. Flash-Lite scores are estimated from model tier and benchmark deltas where needed.
- **Naming:** Use the exact model names from the API/Vertex docs.
- **README and docs always consistent:** Same content in README.md and docs/index.html (intro, table, legend, sources, date, license). When updating either, update both.

## Sources (primary → use first)

| Source | URL | Use for |
|--------|-----|---------|
| **Gemini API Models** | https://ai.google.dev/gemini-api/docs/models | Model list, names, context window, availability |
| **Vertex AI Gemini models** | https://cloud.google.com/vertex-ai/generative-ai/docs/models | Technical details, context, modalities, positioning |
| **Vertex AI Pricing** | https://cloud.google.com/vertex-ai/pricing | Prices per 1M tokens, model names |
| **Google AI Pricing** | https://ai.google.dev/pricing | List prices for Gemini API |
| **Artificial Analysis** | https://www.artificialanalysis.ai/ | Intelligence ordering (ordinal 1–10); only two exact scores in index: use for relative order |
| **Gemini API Reference** | https://ai.google.dev/api | API-related model info |

**Announcements (positioning, new models):**  
https://blog.google/technology/ , https://blog.google/technology/google-deepmind/ — e.g. Gemini 1.5, 2.0, 2.5, 3.x posts.

**Column → source:** Model → API docs / Vertex. Speed, Purpose & use cases → Vertex Model Garden or blog. Intelligence (1–10) → ordinal from Artificial Analysis and model tier. Price → Google AI or Vertex pricing. Release → release notes / changelog or blog.
