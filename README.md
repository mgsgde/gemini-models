# Google Gemini 3 & 3.1 Models

Public overview and comparison of **Google Gemini 3** and **Gemini 3.1** models (as of March 2026). This repository lists and compares all public Gemini 3.x models from Google.

---

## Model Overview (Gemini 3 & 3.1)

| Model | Generation | Category | Purpose | Speed | Intelligence | Context | Typical Use Cases | MMLU | GPQA |
|-------|------------|----------|---------|-------|--------------|---------|-------------------|------|------|
| **Gemini 3.1 Pro** | 3.1 | Pro | Flagship for complex reasoning and coding | Low | Very High | 1M tokens | Agentic workflows; advanced coding; long-context/multimodal understanding | 80.5% | 94.3% |
| **Gemini 3 Flash** | 3.0 | Flash | Frontier reasoning at Flash speed (Pro-grade intelligence) | High | High | 1M tokens | Iterative development; coding and complex analysis; interactive assistants | 81.2% | 90.4% |
| **Gemini 3.1 Flash-Lite** | 3.1 | Flash-Lite | Cost-efficient, low-latency model for high-volume inference | Very High | High | 1M tokens | Mobile chatbots; IoT/edge assistants; high-throughput API processing | – | – |

*Blank entries = metrics not publicly disclosed by Google.*

---

## Comparison: Gemini 3.1 Pro vs. 3 Flash vs. 3.1 Flash-Lite

| Criterion | Gemini 3.1 Pro | Gemini 3 Flash | Gemini 3.1 Flash-Lite |
|-----------|----------------|----------------|------------------------|
| **Generation** | 3.1 | 3.0 | 3.1 |
| **Tier** | Pro (Flagship) | Flash | Flash-Lite |
| **Speed** | Low (highest quality) | High | Very High |
| **Intelligence** | Very High | High (Pro-grade) | High |
| **Context Window** | 1M tokens | 1M tokens | 1M tokens |
| **MMLU** | 80.5% | 81.2% | – |
| **GPQA** | 94.3% | 90.4% | – |
| **Best for** | Agentic tasks, complex coding, long-context | Iterative coding, analysis, assistants | Mobile, IoT, high throughput |

### Quick recommendation

- **Maximum quality & reasoning** → **Gemini 3.1 Pro**
- **Fast + high quality (coding, assistants)** → **Gemini 3 Flash**
- **Cost & latency focus (volume, mobile, edge)** → **Gemini 3.1 Flash-Lite**

---

## Sources

Information is based on official Google publications and documentation for each model (purpose, context window, benchmarks). As of March 2026.

---

## License & usage

This repository is for documentation only. Use of Gemini models is subject to [Google AI / Gemini terms of service](https://ai.google.dev/terms).
