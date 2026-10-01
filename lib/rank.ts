import { PROJECT_CATEGORIES, type ProjectCategory, type RelatedProject } from "./related-projects";

export const INTENTS = [
  { id: "learn", label: "Learn", brief: "Find a useful next source" },
  { id: "make", label: "Make", brief: "Find a practical next move" },
  { id: "ship", label: "Ship", brief: "Find the next thing to finish" },
] as const;
export type Intent = (typeof INTENTS)[number]["id"];

/**
 * Hand-set weights: how well each catalog category serves an intent.
 * These are editorial rules, not learned parameters.
 */
export const CATEGORY_WEIGHTS: Record<string, Record<Intent, number>> = {
  "main": { learn: 3, make: 0, ship: 0 },
  "content-tools": { learn: 1, make: 3, ship: 0 },
  "dev-tools": { learn: 0, make: 3, ship: 1 },
  "productivity": { learn: 0, make: 1, ship: 3 },
  "webmaster": { learn: 1, make: 0, ship: 3 },
  "communication": { learn: 0, make: 1, ship: 1 },
};

export const QUERY_WEIGHT = 4;

export type Recommendation = { project: RelatedProject; category: string; score: number; reasons: string[] };

/**
 * Accents and full-width forms are folded first (NFKD, marks dropped), so
 * "Résumé" is one token "resume" instead of the fragments "sum" / "r" that
 * could match unrelated projects.
 */
function tokens(text: string): string[] {
  return text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 1);
}

/**
 * Scores every catalog project for an intent (category weight) plus an optional
 * free-text query (token overlap with name/slug/category). Ties break by name.
 */
export function rank(intent: Intent, query = "", limit = 5, catalog: ProjectCategory[] = PROJECT_CATEGORIES): Recommendation[] {
  const wanted = new Set(tokens(query));
  const results: Recommendation[] = [];
  for (const category of catalog) {
    const weight = CATEGORY_WEIGHTS[category.id]?.[intent] ?? 0;
    for (const project of category.projects) {
      const reasons: string[] = [];
      let score = 0;
      if (weight > 0) {
        score += weight;
        reasons.push(`${category.label} × ${intent}: +${weight}`);
      }
      const haystack = new Set(tokens(`${project.name} ${project.slug} ${category.label}`));
      const hits = [...wanted].filter((token) => haystack.has(token));
      if (hits.length) {
        score += hits.length * QUERY_WEIGHT;
        reasons.push(`matches “${hits.join("”, “")}”: +${hits.length * QUERY_WEIGHT}`);
      }
      if (score > 0) results.push({ project, category: category.label, score, reasons });
    }
  }
  const max = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : results.length;
  return results.sort((a, b) => b.score - a.score || a.project.name.localeCompare(b.project.name)).slice(0, max);
}
