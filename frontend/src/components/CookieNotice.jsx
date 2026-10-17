import { useEffect, useState } from "react";
import { analyticsConfigured, initAnalytics, stopAnalytics, trackPageView } from "@/lib/analytics";
import { askFirst, optedOutByBrowser, saveChoice, storedChoice } from "@/lib/consent";

/* The cookie notice, the same as on the trip builder pages (same words, same choice, same key). Outside Europe the tools
   load with the page and the notice offers a way out; in Europe nothing loads until the visitor accepts. The footer's
   "Cookie settings" opens it again. It never shows during the build-time prerender. */
const CookieNotice = () => {
  const [ask, setAsk] = useState(null); // null | "notice" | "ask"

  useEffect(() => {
    // Nothing to ask where nothing measures (previews), nor during the prerender.
    if (window.__PRERENDER__ || !analyticsConfigured()) return undefined;
    const strict = askFirst();
    if (storedChoice() === null && !optedOutByBrowser()) setAsk(strict ? "ask" : "notice");
    const reopen = () => setAsk(strict ? "ask" : "notice");
    window.addEventListener("gim-cookie-settings", reopen);
    return () => window.removeEventListener("gim-cookie-settings", reopen);
  }, []);

  const choose = (choice) => {
    saveChoice(choice);
    if (choice === "yes") {
      initAnalytics();
      trackPageView(window.location.pathname + window.location.search);
    } else {
      stopAnalytics();
    }
    setAsk(null);
  };

  if (!ask) return null;
  return (
    <div
      role="dialog"
      aria-label="Cookies"
      aria-live="polite"
      data-testid="cookie-notice"
      className="fixed inset-x-3 bottom-3 z-[150] mx-auto max-w-[34rem] rounded-2xl border border-[var(--c-border)] bg-white p-4 text-[var(--c-text)] shadow-[0_18px_50px_-20px_rgba(15,36,25,0.45)] md:inset-x-auto md:left-4 md:mx-0"
    >
      <p className="font-body text-[14px] leading-[1.5]">
        We use cookies to see how the site is used and to measure our advertising.{" "}
        {ask === "ask" ? "They stay off unless you accept." : "You can turn them off."}{" "}
        <a className="underline underline-offset-2" href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy notice
        </a>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => choose("yes")}
          data-testid="cookie-accept"
          className="inline-flex min-h-[2.5rem] items-center rounded-sm bg-[var(--c-green-deep)] px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--c-off-white)]"
        >
          {ask === "ask" ? "Accept" : "OK"}
        </button>
        <button
          type="button"
          onClick={() => choose("no")}
          data-testid="cookie-decline"
          className="inline-flex min-h-[2.5rem] items-center rounded-sm border border-[var(--c-text)]/40 px-4 font-mono text-[11px] uppercase tracking-[0.12em] hover:border-[var(--c-text)]"
        >
          {ask === "ask" ? "Decline" : "Turn off"}
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;
