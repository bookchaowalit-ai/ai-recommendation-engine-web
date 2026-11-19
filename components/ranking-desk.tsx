"use client";

import { useState } from "react";
import { ListButton, Pill } from "@/components/app-shell";
import { CATEGORY_WEIGHTS, INTENTS, QUERY_WEIGHT, rank, type Intent } from "@/lib/rank";
import { PROJECT_CATEGORIES } from "@/lib/related-projects";

const CATALOG_SIZE = PROJECT_CATEGORIES.reduce((sum, category) => sum + category.projects.length, 0);

/** The reasons already name the category when its weight counted; otherwise say which category the pick is from. */
const detail = (category: string, reasons: string[]) => (reasons.some((reason) => reason.startsWith(`${category} ×`)) ? reasons : [category, ...reasons]).join(" · ");

/** The interactive desk: briefs in the sidebar, keywords in the head, the ranked picks in the list. */
export function RankingDesk() {
  const [intent, setIntent] = useState<Intent>("learn");
  const [query, setQuery] = useState("");
  const active = INTENTS.find((item) => item.id === intent) ?? INTENTS[0];
  const results = rank(intent, query);
  const keywords = query.trim();

  return (
    <div className="as-body">
      <nav className="as-side" aria-label="Briefs">
        <h2>Briefs</h2>
        <ul className="as-lists">
          {INTENTS.map((item) => (
            <ListButton key={item.id} label={item.label} count={rank(item.id, query).length} current={item.id === intent} onSelect={() => setIntent(item.id)} />
          ))}
        </ul>
        <p className="rd-side-note">The brief changes the weights. The catalog of {CATALOG_SIZE} projects stays the same.</p>
      </nav>

      <main id="main" tabIndex={-1} className="as-main">
        <div className="as-head">
          <div>
            <h1>{active.brief}</h1>
            <p>Top {results.length} for {active.label.toLowerCase()}{keywords ? <> with “{keywords}”</> : null} · ranked by hand-set rules, not a model</p>
          </div>
          <div className="as-tools">
            <label className="as-search">
              <span className="as-sr">Keywords</span>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Keywords, e.g. json" />
            </label>
          </div>
        </div>

        <div aria-live="polite">
          {results.length === 0 ? (
            <div className="as-list as-empty">
              <strong>Nothing matches “{keywords}”</strong>
              No project in the catalog fits this brief with those keywords. Try fewer words, or{" "}
              <button type="button" className="as-plain" onClick={() => setQuery("")}>clear the keywords</button>
            </div>
          ) : (
            <ol className="as-list" aria-label={`Picks for ${active.label.toLowerCase()}`}>
              {results.map((item, index) => (
                <li key={item.project.slug} className="as-row rd-row">
                  <span className="rd-rank" aria-hidden="true">{index + 1}</span>
                  <div>
                    <h3><a href={item.project.url}>{item.project.name}</a></h3>
                    <p>{detail(item.category, item.reasons)}</p>
                  </div>
                  <Pill tone="grey">Score {item.score}</Pill>
                </li>
              ))}
            </ol>
          )}
        </div>

        <section className="as-section" aria-labelledby="how-title">
          <h2 id="how-title" className="as-section-title">How a score is made</h2>
          <ul className="as-list">
            <li className="as-row">
              <div>
                <h3>Category weight, 0 to 3</h3>
                <p>For {active.label.toLowerCase()}: {PROJECT_CATEGORIES.map((category) => `${category.label} ${CATEGORY_WEIGHTS[category.id]?.[intent] ?? 0}`).join(" · ")}.</p>
              </div>
            </li>
            <li className="as-row">
              <div>
                <h3>Keywords, +{QUERY_WEIGHT} each</h3>
                <p>Every keyword found in a project&apos;s name or category adds {QUERY_WEIGHT} points. Ties sort by name.</p>
              </div>
            </li>
          </ul>
          <p className="as-note">Deterministic rules over a fixed catalog: no machine-learning model, no tracking and no personal data.</p>
        </section>
      </main>
    </div>
  );
}
