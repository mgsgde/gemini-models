# Public Google Gemini Models

Overview of **all public Google Gemini models** (as of March 2026), including **Gemini 3 and Gemini 3.1**. Below, every model is compared in a single table by the same criteria.

**→ [Website (sortable table)](https://mgsgde.github.io/gemini-models/)** — same content as here, with click-to-sort by Speed, Intelligence, or Price. *(GitHub Pages: Settings → Pages → Source: branch main, folder /docs.)*

---

## Comparison: All models

| Model | Speed | Intelligence (1–10) | Context | Price / 1M tokens (input) | Purpose & use cases |
|-------|-------|----------------------|---------|----------------------------|----------------------|
| **Gemini 3.1 Pro** | Low | 10 | 1M | ~$7 | Flagship for complex reasoning, agents, advanced coding |
| **Gemini 3 Flash** | High | 9 | 1M | ~$0.70 | Fast frontier reasoning, coding, assistants |
| **Gemini 3.1 Flash-Lite** | Very High | 8 | 1M | ~$0.15 | Ultra-cheap high-volume inference |
| **Gemini 2.5 Pro** | Low | 7 | 1M | ~$3.50 | Advanced reasoning and coding |
| **Gemini 2.0 Pro** | Low | 6 | 1M | ~$3 | Experimental flagship for coding |
| **Gemini 2.5 Flash** | High | 5 | 1M | ~$0.35 | Balanced cost/performance for production |
| **Gemini 2.0 Flash** | High | 4 | 1M | ~$0.30 | Multimodal chat, RAG, summarization |
| **Gemini 2.5 Flash-Lite** | Very High | 4 | 1M | ~$0.10 | Massive scale inference |
| **Gemini 1.5 Pro** | Medium | 3 | 128K | ~$3.50 | Long-context reasoning |
| **Gemini 1.5 Flash** | High | 2 | 128K | ~$0.35 | Fast chat and transcription |
| **Gemini 2.0 Flash-Lite** | Very High | 2 | 1M | ~$0.08 | High-volume automation tasks |
| **Gemini 1.5 Flash-8B** | Very High | 1 | 128K | ~$0.08 | Lightweight large-scale inference |

**Intelligence (1–10)** = ordinal ranking (10 = strongest, 1 = lightest). Relative order based on [Artificial Analysis](https://www.artificialanalysis.ai/) and model tier. **Price** = approximate list price per 1M input tokens; check [Google AI](https://ai.google.dev/pricing) or [Vertex AI](https://cloud.google.com/vertex-ai/pricing) for current pricing.

---

## Sources

Information is based on official Google publications (purpose, context window) and the Artificial Analysis Intelligence Index for the intelligence score. As of March 2026.

- [Artificial Analysis — Intelligence Index](https://www.artificialanalysis.ai/) — unified intelligence score (reasoning, coding, knowledge)  
- [Models — Gemini API | Google AI for Developers](https://ai.google.dev/gemini-api/docs/models) — model overview and capabilities  
- [Gemini API documentation](https://ai.google.dev/gemini-api/docs) — API reference and guides  
- [Release notes | Gemini API](https://ai.google.dev/gemini-api/docs/changelog) — model updates and deprecations  
- [Generative AI on Vertex AI | Google Cloud](https://cloud.google.com/vertex-ai/generative-ai/docs) — Vertex AI model docs and lifecycle

---

## Automated updates

A [GitHub Action](.github/workflows/update-models.yml) runs monthly (1st of each month) to refresh the model table using the [gemini-models-update](.cursor/skills/gemini-models-update/SKILL.md) rules and the Gemini API. For the workflow to run, add a repository secret **GEMINI_API_KEY** (get a key from [Google AI Studio](https://aistudio.google.com/app/apikey)). You can also run the update locally: `GEMINI_API_KEY=... npm run update-models`.

---

## License & usage

This repository is for documentation only. Use of Gemini models is subject to [Google AI / Gemini terms of service](https://ai.google.dev/terms).
