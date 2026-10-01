"use client";

import Link from "next/link";
import { useState } from "react";
import { INTENTS, rank, type Intent } from "@/lib/rank";

export default function Home() {
  const [intent, setIntent] = useState<Intent>("learn");
  const [query, setQuery] = useState("");
  const active = INTENTS.find((item) => item.id === intent) ?? INTENTS[0];
  const results = rank(intent, query);

  return (
    <main className="ranking-shell">
      <header className="ranking-header">
        <Link href="/" className="ranking-brand"><span className="brand-mark">RD</span><span>RANKING DESK</span></Link>
        <nav aria-label="Recommendation navigation"><Link href="/more-projects">More projects</Link><a href="https://github.com/bookchaowalit-ai/book-ai" target="_blank" rel="noreferrer">Source ↗</a></nav>
      </header>

      <section className="ranking-hero">
        <div className="hero-index">AI / 04<br />DESK COPY<br />REV. 00</div>
        <div className="hero-statement"><p className="pencil-label">A RULE-BASED RECOMMENDER, SHOWN WITH ITS WORKING</p><h1>Choose a direction. See why each pick made the list.</h1><p>Ranks the Bookchaowalit project catalog with hand-set weights and your keywords. No machine-learning model is involved, and every point of every score is printed next to the pick.</p></div>
      </section>

      <section className="ranking-desk" aria-labelledby="brief-title">
        <aside className="intent-index">
          <p className="mono-label">BRIEF / SELECT ONE</p>
          <div className="intent-tabs" role="group" aria-label="Recommendation intent">
            {INTENTS.map((item) => <button key={item.id} type="button" aria-pressed={intent === item.id} className={intent === item.id ? "is-active" : ""} onClick={() => setIntent(item.id)}><span>{item.label}</span><small>{item.id === intent ? "OPEN" : ""}</small></button>)}
          </div>
          <label className="desk-query"><span className="mono-label">KEYWORDS / OPTIONAL</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. json, tracker, blog" /></label>
          <div className="desk-note"><span className="note-pin" aria-hidden="true" />The brief changes the weights. The catalog stays the same.</div>
        </aside>

        <div className="docket">
          <div className="docket-heading"><div><p className="mono-label">CURRENT BRIEF</p><h2 id="brief-title">{active.brief}</h2></div><span className="docket-state">RULES / {active.id.toUpperCase()}</span></div>
          <p className="docket-intro">Top {results.length} for <strong>{active.label.toLowerCase()}</strong>{query.trim() ? <> with “{query.trim()}”</> : null}, from the local project catalog.</p>
          {results.length === 0 ? <p className="docket-intro" role="status">Nothing in the catalog matches that brief. Try fewer keywords.</p> : <ol className="docket-list" aria-live="polite">
            {results.map((item, index) => <li key={item.project.slug}><span className="docket-no">{String(index + 1).padStart(2, "0")}</span><div><b><a href={item.project.url} target="_blank" rel="noopener noreferrer">{item.project.name}</a></b><p>{item.category} · {item.reasons.join(" · ")}</p></div><span className="row-status">SCORE {item.score}</span></li>)}
          </ol>}
          <div className="docket-footer"><span>Deterministic rules · no personal data</span><span>Catalog: /more-projects</span></div>
        </div>
      </section>

      <footer className="ranking-footer"><span>bookchaowalit / AI domain</span><span>Explain the next thing</span><Link href="https://bookchaowalit.com">Portfolio ↗</Link></footer>
    </main>
  );
}
