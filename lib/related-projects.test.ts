import { describe, expect, it } from "vitest";
import { PROJECT_CATEGORIES } from "./related-projects";

describe("project catalog", () => {
  it("uses unique slugs and https URLs on bookchaowalit.com", () => {
    const projects = PROJECT_CATEGORIES.flatMap((category) => category.projects);
    expect(projects.length).toBe(43);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    for (const project of projects) expect(project.url).toMatch(/^https:\/\/([a-z0-9-]+\.)?bookchaowalit\.com(\/[a-z0-9-]+)?$/);
  });

  it("no longer points at retired *.vercel.app hosts", () => {
    expect(JSON.stringify(PROJECT_CATEGORIES)).not.toContain("vercel.app");
  });
});
