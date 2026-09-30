import { describe, expect, it } from "vitest";
import { QUERY_WEIGHT, rank } from "./rank";

const catalog = [
  { id: "dev-tools", label: "Dev tools", projects: [{ name: "Regex Tester", url: "https://r.test", slug: "regex" }, { name: "Base64", url: "https://b.test", slug: "base64" }] },
  { id: "main", label: "Main sites", projects: [{ name: "Wiki", url: "https://w.test", slug: "wiki" }] },
];

describe("rank", () => {
  it("orders by intent weight and breaks ties by name", () => {
    expect(rank("make", "", 5, catalog).map((r) => r.project.slug)).toEqual(["base64", "regex"]);
    expect(rank("learn", "", 5, catalog).map((r) => r.project.slug)).toEqual(["wiki"]);
  });

  it("boosts query matches and explains every point", () => {
    const [top] = rank("learn", "regex", 5, catalog);
    expect(top.project.slug).toBe("regex");
    expect(top.score).toBe(QUERY_WEIGHT);
    expect(top.reasons).toEqual([`matches “regex”: +${QUERY_WEIGHT}`]);
  });

  it("returns nothing rather than inventing a match", () => {
    expect(rank("ship", "", 5, catalog)).toEqual([{ project: catalog[0].projects[1], category: "Dev tools", score: 1, reasons: ["Dev tools × ship: +1"] }, { project: catalog[0].projects[0], category: "Dev tools", score: 1, reasons: ["Dev tools × ship: +1"] }]);
    expect(rank("learn", "zzz", 5, [catalog[0]])).toEqual([]);
  });

  it("respects the limit on the real catalog", () => {
    expect(rank("ship")).toHaveLength(5);
  });
});

describe("rank edge cases", () => {
  const resume = [
    { id: "main", label: "Main sites", projects: [{ name: "Resume", url: "https://c.test", slug: "resume" }] },
    { id: "communication", label: "Communication", projects: [{ name: "Sum Board", url: "https://s.test", slug: "sum-board" }] },
  ];

  it("folds accents and full-width letters instead of splitting words apart", () => {
    expect(rank("make", "Résumé", 5, resume).map((r) => r.project.slug)).toEqual(["resume", "sum-board"]);
    expect(rank("make", "Résumé", 5, resume)[0].score).toBe(QUERY_WEIGHT);
    expect(rank("learn", "ＲＥＧＥＸ", 5, catalog)[0].project.slug).toBe("regex");
  });

  it("treats a negative or non-finite limit as none / no limit instead of dropping results", () => {
    expect(rank("make", "", -1, catalog)).toEqual([]);
    expect(rank("make", "", Number.POSITIVE_INFINITY, catalog)).toHaveLength(2);
    expect(rank("make", "", Number.NaN, catalog)).toHaveLength(2);
  });
});
