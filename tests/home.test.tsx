// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import RootLayout, { metadata } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

vi.mock("next/font/google", () => ({ Geist: () => ({ variable: "font-geist" }) }));
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root;
let host: HTMLDivElement;
const $ = <T extends Element = HTMLElement>(selector: string) => host.querySelector(selector) as T | null;
const brief = (label: string) => [...host.querySelectorAll(".as-lists button")].find((b) => b.textContent?.startsWith(label)) as HTMLButtonElement;
const press = (el: Element) => act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
const search = (value: string) => {
  const input = $('input[type="search"]') as HTMLInputElement;
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
};
const picks = () => [...host.querySelectorAll(".rd-row h3")].map((h) => h.textContent);

beforeEach(() => {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  act(() => root.render(<Home />));
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

describe("Ranking Desk on the App shell", () => {
  it("opens on Learn with five picks, each with its working and score", () => {
    expect($("h1")?.textContent).toBe("Find a useful next source");
    expect(brief("Learn").getAttribute("aria-current")).toBe("true");
    expect(picks()).toEqual(["Blog", "DevHub", "Linktree", "Portfolio", "TechSpace"]);
    expect($(".rd-row p")?.textContent).toBe("Main sites × learn: +3");
    expect($(".rd-row .as-pill")?.textContent).toBe("Score 3");
    expect($(".rd-row a")?.getAttribute("href")).toBe("https://techblog.bookchaowalit.com");
    expect($(".rd-row a")?.getAttribute("target")).toBeNull();
    expect(host.textContent).toContain("not a model");
    expect(host.textContent).toContain("catalog of 43 projects");
  });

  it("switches the brief and the weights in the scoring note", () => {
    press(brief("Ship"));
    expect(brief("Ship").getAttribute("aria-current")).toBe("true");
    expect($("h1")?.textContent).toBe("Find the next thing to finish");
    expect($(".as-section")?.textContent).toContain("For ship: Productivity 3 · Dev tools 1");
  });

  it("boosts keyword matches, counts per brief and offers a way out of an empty result", () => {
    search("regex");
    expect(picks()[0]).toBe("Regex Tester");
    // A keyword-only pick names its category, since no category reason does.
    expect($(".rd-row p")?.textContent).toBe("Dev tools · matches “regex”: +4");
    expect($(".as-head p")?.textContent).toContain("with “regex”");
    search("zzzz");
    // An unknown keyword adds nothing: Learn still lists the five main-site picks, and every brief counts its picks.
    expect(picks()).toHaveLength(5);
    expect([...host.querySelectorAll(".as-lists .as-count")].map((c) => c.textContent)).toEqual(["5", "5", "5"]);
  });

  it("shows the empty state when nothing scores and clears the keywords from it", async () => {
    const rank = await import("@/lib/rank");
    const spy = vi.spyOn(rank, "rank").mockReturnValue([]);
    act(() => root.render(<Home />));
    search("nothing");
    expect($(".as-empty")?.textContent).toContain("Nothing matches “nothing”");
    press([...host.querySelectorAll(".as-empty button")][0]);
    expect(($('input[type="search"]') as HTMLInputElement).value).toBe("");
    spy.mockRestore();
  });

  it("has a skip link, a footer back to the hub and the real source repo", () => {
    expect($(".as-skip")?.getAttribute("href")).toBe("#main");
    expect($("#main")?.getAttribute("tabindex")).toBe("-1");
    const links = [...host.querySelectorAll(".as-foot a")].map((a) => a.getAttribute("href"));
    expect(links).toContain("https://bookchaowalit.com/");
    expect(links).toContain("https://github.com/bookchaowalit-ai/ai-recommendation-engine-web");
  });
});

describe("layout and metadata", () => {
  it("uses Geist on <html> and the site's own domain", () => {
    expect(renderToString(<RootLayout><p>child</p></RootLayout>)).toContain('<html lang="en" class="font-geist">');
    expect(String(metadata.metadataBase)).toBe("https://recommendation-engine.bookchaowalit.com/");
    expect(sitemap().map((entry) => entry.url)).toEqual(["https://recommendation-engine.bookchaowalit.com"]);
    expect(robots().sitemap).toBe("https://recommendation-engine.bookchaowalit.com/sitemap.xml");
  });
});
