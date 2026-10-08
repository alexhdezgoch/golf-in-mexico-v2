import {
  NOT_FOUND_MARKDOWN,
  config,
  normalizePath,
  parseSitemap,
  wantsMarkdown,
} from "../middleware";

describe("wantsMarkdown", () => {
  it("is true only when Markdown is asked for and not ranked below HTML", () => {
    expect(wantsMarkdown("text/markdown")).toBe(true);
    expect(wantsMarkdown("Text/Markdown")).toBe(true);
    expect(wantsMarkdown("text/markdown, text/html;q=0.9")).toBe(true);
    expect(wantsMarkdown("text/html, text/markdown;q=0.5")).toBe(false);
    expect(wantsMarkdown("text/markdown;q=0")).toBe(false);
  });

  it("is false for browsers and clients that don't mention Markdown", () => {
    expect(wantsMarkdown("text/html")).toBe(false);
    expect(wantsMarkdown("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")).toBe(false);
    expect(wantsMarkdown("*/*")).toBe(false);
    expect(wantsMarkdown(null)).toBe(false);
  });
});

describe("normalizePath", () => {
  it("ignores case and trailing slashes, like the app's router", () => {
    expect(normalizePath("/")).toBe("/");
    expect(normalizePath("")).toBe("/");
    expect(normalizePath("/Destinations/Los-Cabos/")).toBe("/destinations/los-cabos");
  });

  it("keeps a path with broken percent-encoding instead of throwing", () => {
    expect(normalizePath("/%E0%A4%A")).toBe("/%e0%a4%a");
  });
});

describe("parseSitemap", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://golf-in-mexico.com/</loc></url>
  <url><loc>https://golf-in-mexico.com/destinations/los-cabos</loc></url>
  <url><loc>https://golf-in-mexico.com/Journal/Some-Article/</loc></url>
</urlset>`;

  it("returns the normalized path of every <loc>", () => {
    const routes = parseSitemap(xml);
    expect(routes.size).toBe(3);
    expect(routes.has("/")).toBe(true);
    expect(routes.has("/destinations/los-cabos")).toBe(true);
    expect(routes.has("/journal/some-article")).toBe(true);
    expect(routes.has("/no-such-page")).toBe(false);
  });

  it("returns an empty set for an empty or missing sitemap", () => {
    expect(parseSitemap("").size).toBe(0);
    expect(parseSitemap(undefined).size).toBe(0);
  });
});

describe("matcher", () => {
  const matches = (path) => new RegExp(`^${config.matcher[0]}$`).test(path);

  it("covers page-like paths", () => {
    expect(matches("/")).toBe(true);
    expect(matches("/destinations/los-cabos")).toBe(true);
    expect(matches("/destinations/los-cabos/")).toBe(true);
    expect(matches("/no-such-page")).toBe(true);
  });

  it("skips assets, files and Vercel internals", () => {
    expect(matches("/static/js/main.js")).toBe(false);
    expect(matches("/llms.txt")).toBe(false);
    expect(matches("/sitemap.xml")).toBe(false);
    expect(matches("/index.md")).toBe(false);
    expect(matches("/404.html")).toBe(false);
    expect(matches("/logo-wordmark.png")).toBe(false);
    expect(matches("/_vercel/insights/script")).toBe(false);
  });
});

describe("NOT_FOUND_MARKDOWN", () => {
  it("explains the error and points agents at the site's indexes", () => {
    expect(NOT_FOUND_MARKDOWN.startsWith("# 404")).toBe(true);
    expect(NOT_FOUND_MARKDOWN).toContain("https://golf-in-mexico.com/llms.txt");
    expect(NOT_FOUND_MARKDOWN).toContain("https://golf-in-mexico.com/sitemap.xml");
  });
});
