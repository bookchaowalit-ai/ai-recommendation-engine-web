import type { MetadataRoute } from "next";

/** Default canonical origin; override per deployment with NEXT_PUBLIC_SITE_URL. */
export const DEFAULT_SITE_URL = "https://recommendation-engine.bookchaowalit.com";

/** Public routes listed in sitemap.xml (keep in sync with app/). */
export const PUBLIC_ROUTES = ["/"] as const;

/**
 * Resolve the canonical origin used by metadata, robots.txt, sitemap.xml and the
 * MCP app info. Unset or blank falls back to DEFAULT_SITE_URL; anything that is
 * not an absolute http(s) URL fails loudly instead of emitting broken URLs.
 */
export function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();
  if (!value) return DEFAULT_SITE_URL;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL, got "${value}"`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`NEXT_PUBLIC_SITE_URL must use http or https, got "${url.protocol}"`);
  }
  return `${url.origin}${url.pathname}`.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export function buildSitemap(base: string = SITE_URL): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: route === "/" ? base : `${base}${route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.5,
  }));
}

export function buildRobots(base: string = SITE_URL): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${base}/sitemap.xml`,
  };
}

/** Shared 1200x630 social card (public/og.png, made with the `art` CLI card template). */
export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Ranking Desk | Bookchaowalit" } as const;

/** Crawlers cannot fetch an image from a loopback or plain-http origin, so those builds announce no image card. */
export function isShareableOrigin(url: string): boolean {
  const { protocol, hostname } = new URL(url);
  const loopback = hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "[::1]" || /^127\./.test(hostname) || hostname === "0.0.0.0";
  return protocol === "https:" && !loopback;
}

/** Image fields every page's openGraph / twitter metadata spreads in (a small text card when the origin is not shareable). */
export const SOCIAL_CARD = isShareableOrigin(SITE_URL)
  ? { openGraph: { images: [OG_IMAGE] }, twitter: { card: "summary_large_image" as const, images: [OG_IMAGE.url] } }
  : { openGraph: {}, twitter: { card: "summary" as const } };
