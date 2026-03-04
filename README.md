# Public Google Gemini Models

Overview of **all public Google Gemini models** (as of June 2024), including **Gemini 3 and Gemini 3.1**. Below, every model is compared in a single table by the same criteria.

**→ [Website (sortable table)](https://mgsgde.github.io/gemini-models/)** — same content as here, with click-to-sort by Speed, Intelligence, or Price. *(GitHub Pages: Settings → Pages → Source: branch main, folder /docs.)*

---

## Comparison: All models

| Model | Speed | Intelligence (1–10) | Price / 1M tokens (input) | Release | Purpose & use cases |
|-------|-------|----------------------|----------------------------|---------|----------------------|
| ****Gemini 1.0 Ultra**** | Low | 10 | Not available | TBD | Flagship model for complex reasoning and advanced use cases (no longer available) |
| ****Gemini 1.5 Pro**** | Medium | 8 | ~$3.50 | May 2024 | Strong performance and long context window |
| ****Gemini 1.5 Flash**** | High | 7 | ~$0.35 | May 2024 | Fast and efficient model for high-volume tasks |
| ****Gemini 1.0 Pro**** | Medium | 6 | ~$1.40 | Dec 2023 | General-purpose model for a wide range of tasks |
| ****Gemini 1.0 Flash**** | High | 5 | ~$0.40 | May 2024 | Fast, cost-effective model fine-tuned for speed and efficiency. |

**Intelligence (1–10)** = ordinal ranking (10 = strongest, 1 = lightest). Relative order based on [Artificial Analysis](https://www.artificialanalysis.ai/) and model tier. **Price** = approximate list price per 1M input tokens; check [Google AI](https://ai.google.dev/pricing) or [Vertex AI](https://cloud.google.com/vertex-ai/pricing) for current pricing.

---



## Sources

Information is based on official Google publications (purpose, context window) and the Artificial Analysis Intelligence Index for the intelligence score. As of June 2024.

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
