---
name: deploy-gemini-models
description: When the user says "Deploy", runs the Gemini model table update script, then commits and pushes. Use when the user says deploy in the gemini-models repo.
---

# Deploy Gemini Models

When the user says **"Deploy"** (or "deploy") in this repo, run the following in order.

## Workflow

1. **Update model table**  
   Run the update script (uses [gemini-models-update](.cursor/skills/gemini-models-update/SKILL.md) rules; needs `GEMINI_API_KEY` in `.env`):

   ```bash
   npm run update-models
   ```

   This updates `docs/index.html` (table, sources, "As of" date) and `README.md` ("As of" date). Optionally `sources.json` is written.

2. **Commit**  
   Stage the files changed by the update, then commit:

   ```bash
   git add docs/index.html README.md sources.json 2>/dev/null; git add -u
   git status
   git commit -m "chore: update model table (as of <date>)"
   ```

   Use the actual "As of" date from the script output (e.g. "March 2026") in the commit message. If nothing to commit, skip the commit step.

3. **Push**  
   ```bash
   git push origin main
   ```

   Deployment is automatic: GitHub Pages serves from this repo; the site updates after the push.

## Notes

- Only run this workflow in the **gemini-models** repository.
- If `npm run update-models` fails (e.g. missing `GEMINI_API_KEY`), report the error and do not commit or push.
- If the branch is behind `origin/main`, run `git pull --rebase origin main` before committing, then push.
