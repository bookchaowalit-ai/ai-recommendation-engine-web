# 01 — Business process (As-Is / To-Be)

ai-recommendation-engine-web ("Ranking Desk") คือเว็บจัดอันดับโปรเจกต์ใน catalog ของ bookchaowalit ด้วยกฎที่กำหนดเอง (น้ำหนักตามหมวดและ intent บวกคีย์เวิร์ด) แล้วแสดงคะแนนพร้อมเหตุผลทุกข้อ ไม่ใช้โมเดล ไม่เก็บข้อมูลผู้ใช้ ทำงานในเบราว์เซอร์ทั้งหมด มี `/api/mcp` ให้ agent ถามข้อมูลแอป

Last reviewed: 2026-11-28 · commit `3c404eb`

## As-Is (จากโค้ดวันนี้)

```mermaid
flowchart TD
  DEV["push or PR to main"] --> CI["CI: ci-node (lint, typecheck, test, build) + security scan"]
  DEV --> DEPLOY["deploy to host: no workflow in repo deploys, path unknown (Vercel Git or CLI) [ต้องยืนยัน]"]
  CAT["lib/related-projects.ts (static catalog, live project URLs)"] --> RANK["rank(intent, query, limit 5)"]
  VISITOR["visitor"] --> PAGE["/ server page"]
  PAGE --> DESK["RankingDesk (client component)"]
  DESK --> INTENT["pick intent: learn / make / ship (default learn)"]
  DESK --> KEYS["type keywords"]
  INTENT --> RANK
  KEYS --> RANK
  RANK -->|"score = category weight + 4 per keyword hit; ties by name"| PICKS["top 5 picks with score and reasons, links out to each project"]
  RANK -->|"no score above 0"| NONE["empty state: nothing matches, clear keywords"]
  VISITOR --> OLD["/more-projects"] -->|"308"| HUB["bookchaowalit.com"]
  AGENT["MCP client"] -->|"POST /api/mcp (edge)"| RPC["handleRpc"]
  RPC -->|"body not JSON"| E400["400 parse error"]
  RPC -->|"not JSON-RPC 2.0"| EINV["error -32600"]
  RPC -->|"notification"| R202["202 no body"]
  RPC -->|"tools/call get_app_info"| INFO["app name, description, SITE_URL"]
  RPC -->|"other tool or method"| EOTHER["error -32602 or -32601"]
```

Sources: `app/page.tsx`, `components/ranking-desk.tsx`, `lib/rank.ts`, `lib/related-projects.ts`, `lib/mcp.ts`, `app/api/mcp/route.ts`, `lib/site.ts`, `app/robots.ts`, `app/sitemap.ts`, `next.config.ts`, `.github/workflows/ci.yml`, `README.md`, `docs/UPGRADE-PLAN.md`

ข้อเท็จจริงสำคัญจากโค้ด:

- ไม่มี database, ไม่มี fetch ไป backend, ไม่มี analytics หรือ Sentry ใน repo; ผลทั้งหมดคำนวณจาก catalog ที่ build มากับแอป
- keyword จับคู่กับ token ของชื่อ slug และชื่อหมวดเท่านั้น (ไม่มี description/tag ต่อโปรเจกต์)
- `SITE_URL` มาจาก `NEXT_PUBLIC_SITE_URL` หรือ default `https://recommendation-engine.bookchaowalit.com`; ค่าที่ไม่ใช่ http(s) URL ทำให้ build/โหลดโมดูลล้ม (`resolveSiteUrl` throw) ไม่ใช่ fallback เงียบ ๆ
- `robots.ts` ห้าม `/api/`; sitemap มีหน้าเดียว
- README ยังบอก default ว่า `https://bookchaowalit-recommendation-engine-frontend.vercel.app` แต่โค้ดใช้โดเมน `recommendation-engine.bookchaowalit.com` (เอกสารตกค้าง)
- ที่ deploy จริงไม่อยู่ใน repo [ต้องยืนยัน]

## To-Be (จาก docs/UPGRADE-PLAN.md)

```mermaid
flowchart TD
  CAT["catalog with short description and tags per project"] --> RANK["rank(intent, query)"]
  VISITOR["visitor"] --> DESK["RankingDesk"]
  DESK --> INTENT["pick intent"]
  DESK --> KEYS["type keywords (match name and tags)"]
  DESK --> SLIDERS["adjust weights with sliders"]
  INTENT --> RANK
  KEYS --> RANK
  SLIDERS --> RANK
  RANK --> PICKS["top picks with score and reasons"]
  DESK --> OG["social card (OG image)"]
```

Sources: `docs/UPGRADE-PLAN.md` (Backlog P1, P2)

## Gap

| ID | As-Is → To-Be | Status | Owner | Evidence |
|---|---|---|---|---|
| G1 | keyword match on names only → short descriptions/tags per project | todo | claude | `docs/UPGRADE-PLAN.md` P1 |
| G2 | fixed hand-set weights → visitor adjusts weights with sliders | todo | claude | `docs/UPGRADE-PLAN.md` P1 |
| G3 | no OG image → social card | todo | claude | `docs/UPGRADE-PLAN.md` P2 |

## Open questions

- README บรรทัด Configuration ระบุ default URL เก่า (`*.vercel.app`) ไม่ตรงกับ `lib/site.ts`
