"use client";

import Link from "next/link";
import { useState } from "react";

const intents = [
  { id: "learn", label: "Learn", brief: "Find a useful next source" },
  { id: "make", label: "Make", brief: "Find a practical next move" },
  { id: "ship", label: "Ship", brief: "Find the next thing to finish" },
] as const;

type Intent = (typeof intents)[number]["id"];

export default function Home() {
  const [intent, setIntent] = useState<Intent>("learn");
  const active = intents.find((item) => item.id === intent) ?? intents[0];

  return (
    <main className="ranking-shell">
      <header className="ranking-header">
        <Link href="/" className="ranking-brand"><span className="brand-mark">RD</span><span>RANKING DESK</span></Link>
        <nav aria-label="Recommendation navigation"><Link href="/more-projects">More projects</Link><a href="https://github.com/bookchaowalit-ai/book-ai" target="_blank" rel="noreferrer">Source ↗</a></nav>
      </header>

      <section className="ranking-hero">
        <div className="hero-index">AI / 04<br />DESK COPY<br />REV. 00</div>
        <div className="hero-statement"><p className="pencil-label">A RECOMMENDATION ENGINE, BEFORE THE ENGINE</p><h1>Choose a direction. We&apos;ll show you what is still missing.</h1><p>No model, catalog, or inference service is connected in this repository yet. This is the reading desk for that future system — with no invented ranking passed off as advice.</p></div>
      </section>

      <section className="ranking-desk" aria-labelledby="brief-title">
        <aside className="intent-index">
          <p className="mono-label">BRIEF / SELECT ONE</p>
          <div className="intent-tabs" role="tablist" aria-label="Recommendation intent">
            {intents.map((item) => <button key={item.id} type="button" role="tab" aria-selected={intent === item.id} className={intent === item.id ? "is-active" : ""} onClick={() => setIntent(item.id)}><span>{item.label}</span><small>{item.id === intent ? "OPEN" : ""}</small></button>)}
          </div>
          <div className="desk-note"><span className="note-pin" aria-hidden="true" />The brief changes. The evidence does not.</div>
        </aside>

        <div className="docket">
          <div className="docket-heading"><div><p className="mono-label">CURRENT BRIEF</p><h2 id="brief-title">{active.brief}</h2></div><span className="docket-state">UNWIRED / {active.id.toUpperCase()}</span></div>
          <p className="docket-intro">An illustrative desk state for <strong>{active.label.toLowerCase()}</strong>. A live engine would rank items here only after a catalog and model contract are attached.</p>
          <ol className="docket-list">
            <li><span className="docket-no">01</span><div><b>Model connection</b><p>Not on file — no inference result can be claimed.</p></div><span className="row-status">WAITING</span></li>
            <li><span className="docket-no">02</span><div><b>Candidate catalog</b><p>Not on file — there is nothing truthful to rank.</p></div><span className="row-status">EMPTY</span></li>
            <li><span className="docket-no">03</span><div><b>Recommendation rationale</b><p>Held back until a real candidate and reason can travel together.</p></div><span className="row-status">WITHHELD</span></li>
          </ol>
          <div className="docket-footer"><span>Illustrative interface state</span><span>Not a live recommendation</span></div>
        </div>
      </section>

      <footer className="ranking-footer"><span>bookchaowalit / AI domain</span><span>Explain the next thing</span><Link href="https://bookchaowalit.com">Portfolio ↗</Link></footer>
    </main>
  );
}
