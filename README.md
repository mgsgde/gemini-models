# Public Google Gemini Models

Overview of **all public Google Gemini models** (as of March 2026), including **Gemini 3 and Gemini 3.1**. Below, every model is compared in a single table by the same criteria.

**→ [Website (sortable table)](https://mgsgde.github.io/gemini-models/)** — same content as here, with click-to-sort by Speed, Intelligence, or Price. *(GitHub Pages: Settings → Pages → Source: branch main, folder /docs.)*

---

## Comparison: All models

| Model | Speed | Intelligence | Price | Release | Purpose & use cases |
|-------|-------|----------------------|-------|---------|----------------------|
| **Gemini 3.1 Pro** | Low | 10 | ~$2.00 | Feb 2026 | Flagship for complex reasoning, agents, advanced coding |
| **Gemini 3 Pro** | Low | 9 | ~$2.00 | Nov 2025 | Advanced reasoning for science, research, and engineering |
| **Gemini 3 Flash** | High | 8 | ~$0.50 | Jan 2026 | Balanced speed and vision for agentic workflows |
| **Gemini 3.1 Flash-Lite** | Very High | 7 | ~$0.25 | Mar 2026 | Ultra-fast for high-volume translation and content moderation |
| **Gemini 2.5 Pro** | Low | 9 | ~$1.25 | Jun 2025 | High-capability reasoning with adaptive thinking for coding |
| **Gemini 2.5 Flash** | High | 6 | ~$0.30 | Jun 2025 | Efficient multimodal tasks and responsive chat |
| **Gemini 2.5 Flash-Lite** | Very High | 5 | ~$0.15 | Jul 2025 | Lightweight high-throughput tasks at scale |
| **Gemini 2.0 Flash** | High | 6 | ~$0.10 | Feb 2025 | Cost-effective multimodal general-purpose specialist |
| **Gemini 2.0 Flash-Lite** | Very High | 4 | ~$0.05 | Feb 2025 | Streamlined for high-frequency simple tasks |

**Intelligence** = ordinal ranking 1–10 (10 = strongest, 1 = lightest). Relative order based on [Artificial Analysis](https://www.artificialanalysis.ai/) and model tier. **Price** = approximate list price per 1M input tokens; check [Google AI](https://ai.google.dev/pricing) or [Vertex AI](https://cloud.google.com/vertex-ai/pricing) for current pricing.

---



## Sources

Information is based on official Google publications (purpose, context window) and the Artificial Analysis Intelligence Index for the intelligence score. As of March 2026.

- [google.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFddvIm5ju1w54br0869XMEwE0vm7Alvt9Xw8M_0hUbosk07wXViifpoRxGWsTwG4_piQZvRm9leyDgLcf7NHsWRcarP9z_8bP855X09EA33FeyB6OBUYS9F565Cw==)
- [google.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG4ApsjLapNqwSPRECohRR6SJvhbX8XwJT764Kz3vjWSr8yaJts0BSTNmKYO1oDFREpWk5fFoVEa9ZROW50TPraCIA9vFaW-IAIAI9S_Kuebdupz2w45v3KWf8Aj3t-oFoLqQ-Ftu7XPyMGF6XYsNuk_PiIagOOnIBZUYg=)
- [google.dev](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEXRPRiN0wTacX1c42Fl6IEk2UsRNrdaSuGGI3km6I8MDjel24VTake0sfuOsEvrkY1tCL8JnF__W5xK0sy-VFdS74vMij636zH7knInYH9wBNyMHJtUZgBnPiPL5SwjaoN7LW1VrNtvA==)
- [google.dev](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG1KUhVSKLiZjyL5WwYwJmp4bwU3lSp0jofdz91DCdSqdmEvj43rHaDKaz2DOxCUoZPVDXjSF4XuZ9ziapchd5mzEZ_oKsf2bmGxZHsoBmNDwXeHfaK7RmBg0s8av-LaKWvxm9g1IM=)
- [automatio.ai](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEEiUrMI3GEXbg4FS7n6OSTzaRNjzmV8B-i9Yb65dlBZ0005xfq1r9jComBd_zP-1a9DH5wNhg2WJjMdRtHGl8W-1E_3cKFS64YbZOosU_ehj7qPg59m56awUVfhhX5myMwwZn1)
- [blog.google](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEFfF1eOhFq_sUp0h1xwfUVkKMl8Hka1b_Qm758HA7HFvr1bbukKkXZLrrGIh0mQX2s-u1HpHLK8KbOhHYlBg9N0VJbA-I90-usxPIjXvFEj831mttzHGqvEVcwiffTWH3ayhWKxP4nLGlKMCaclX9kZ6HZLjScqy_2RcfbQlVhsOZ8BkBrKA85Sv-HaSgeofNeTg8CxNkAvQ==)
- [google.dev](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHXqPPO9EMDfpCn0VZUvgtzi3JSnwe0Cw2Lm0DhE7OgBOBElj-bmlJgCTN5VcPdM2PfzdSJJLCSa2d7fKtlSOlAQ3-yPpnsMvexYM2ihxiaaTFEyqShZ9tuSfUSt0patzrJcw5zW6_ZX3E=)
- [apidog.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHaHIPDPNMwzIi4dTv2XKCJAjXRsvLydb0NJ8SR41nBaqVGzbbAAjYO7kzY_rFu6QC-5bNDJDjbJGJOYg7MVZkzl2e8RxtqYUd-EByytW2KygeJZWcLqpy3g4BTRBPXffyK)

---



## Automated updates

A [GitHub Action](.github/workflows/update-models.yml) runs monthly (1st of each month) to refresh the model table using the [gemini-models-update](.cursor/skills/gemini-models-update/SKILL.md) rules and the Gemini API. For the workflow to run, add a repository secret **GEMINI_API_KEY** (get a key from [Google AI Studio](https://aistudio.google.com/app/apikey)). You can also run the update locally: `GEMINI_API_KEY=... npm run update-models`.

---

## License & usage

This repository is for documentation only. Use of Gemini models is subject to [Google AI / Gemini terms of service](https://ai.google.dev/terms).
