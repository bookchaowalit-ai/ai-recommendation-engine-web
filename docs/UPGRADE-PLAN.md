# Upgrade plan

## Current state

Score: 6/10 (was 3/10) — the desk now actually ranks a real catalog with visible reasoning instead of an empty "unwired" docket; rules are hand-tuned.

## Backlog

- P1: Add short descriptions/tags per project so keyword matching is not limited to names.
- P1: Let the visitor adjust the weights (sliders) and see the ranking change.
- P2: Add an OG image (the missing `/og-image.png` reference was removed).

## Done in this pass

- CI (`.github/workflows/ci.yml`): `npm ci`, lint, typecheck, vitest, `next build` on every push and PR.
- `/api/mcp` uses a typed JSON-RPC handler (`lib/mcp.ts`, tested) with proper error codes and an honest `get_app_info` tool; this fixed the template's lint errors.
- `/more-projects` renders from `lib/related-projects.ts` (was ~980 lines of unrolled links plus an unused data copy) and no longer links to itself; removed the stale `app/page.tsx.backup`.
- New `lib/rank.ts` (tested): deterministic ranking by intent weight + keyword overlap, tie-break by name, with a per-point explanation for each pick.
- Page shows the top 5 with links, reasons and scores; intent toggles use `aria-pressed` instead of an incomplete tablist.
- Metadata: removed the canonical pointing at the portfolio root and the non-existent `/og-image.png`.
- `DESIGN.md` first-viewport section updated to describe the rule-based desk.

## Done in this pass (pass 2)

- Canonical host is config-driven: `lib/site.ts` resolves `NEXT_PUBLIC_SITE_URL` (validated, clear error on a non-http(s) value) and feeds `metadataBase`, generated `app/sitemap.ts` / `app/robots.ts` and the MCP `get_app_info` URL; removed the stale template `public/sitemap.xml` / `robots.txt` (they pointed at `bookchaowalit.com` and a `*.vercel.app` name that differs from the project URL). Tested in `lib/site.test.ts`.

## Done in this pass (pass 3)
- Edge-case pass on `lib/rank.ts` (regression tests in `lib/rank.test.ts`):
  - Query tokens split on every non-ASCII letter, so "Résumé" became "sum"
    and boosted an unrelated "Sum Board", and full-width "ＲＥＧＥＸ" matched
    nothing. Text is now NFKD-folded with combining marks removed.
  - `rank(..., limit)` with a negative limit dropped the last result
    (`slice(0, -1)`) and NaN returned nothing; the limit is now clamped
    (negative → none, non-finite → no limit).
- Security deps: `next` 16.1.6 -> 16.3.8 (and `eslint-config-next`) clears critical GHSA-2xp9-vwfh-vxw4 (Image Optimization RCE) plus bundled postcss/sharp highs; lockfile regenerated with same-major `npm audit fix`. `npm audit --omit=dev`: C1/H3/M1/L0 [nanoid:h,next:c,postcss:h,sharp:h] -> C0/H0/M0/L0.
