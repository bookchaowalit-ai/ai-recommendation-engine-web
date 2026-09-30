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

CI runs the same checks on every push (`.github/workflows/ci.yml`).
