# Ranking Desk — Recommendation Engine

A transparent, rule-based recommender over the Bookchaowalit project catalog
(`lib/related-projects.ts`). Pick an intent (learn / make / ship), optionally
add keywords, and the desk ranks projects with hand-set category weights plus
keyword overlap. Every score is printed with its reasons.

## Honesty

- No machine-learning model, embeddings, or user tracking: weights live in
  `lib/rank.ts` and are editorial.
- The catalog is static and shipped with the app.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

CI (`.github/workflows/ci.yml`) runs the same checks on pushes to `main` and on pull requests through the shared `platform-ci-workflows` `ci-node.yml`, plus its `security.yml` scans (Gitleaks, Semgrep, OSV-Scanner, Trivy). Reviewed OSV exceptions live in `osv-scanner.toml`.

## Configuration

- `NEXT_PUBLIC_SITE_URL` (optional): canonical origin used for metadata, `/sitemap.xml`, `/robots.txt` and the MCP app info. Defaults to `https://bookchaowalit-recommendation-engine-frontend.vercel.app`; must be an absolute http(s) URL.
