import { Link } from "react-router-dom";
import { CONSENT_NOTICE } from "@/config/hubspot";

/* ═══════════════════════════════════════════════════════════════════
   ConsentNotice — the line a visitor reads before handing over an email.
   ═══════════════════════════════════════════════════════════════════
   One component under every live capture point, rendering the SAME sentence
   that lib/hubspot.js records on the contact (see CONSENT_NOTICE in
   config/hubspot.js). Change the wording there, not here.

   It renders in the closed state of the two-step CTAs as well as the open one,
   on purpose:
     - the promise is visible before the visitor commits to typing, and
     - the height is constant, so opening a form never reflows the row (the
       destination cards reserve `sm:min-h` for exactly that reason).

   `tone` picks a palette per backdrop — all three are verified ≥4.5:1 against
   the worst case of the surface they sit on:
     light  #4a4540 on --c-surface #f0ece3     →  8.0:1   link #0f2419 → 13.8:1
     dark   white/75 on #0a0a0a / #0f2419      →  9.6:1+  link gold-light
     photo  white/95 over the cards' bottom    →  8.6:1   link gold-light → 5.4:1
            black/72 gradient (worst case = a
            pure-white photo pixel underneath)
   The link is underlined, never color-only, and carries its own focus-visible
   ring in a color that reads on its own backdrop.
*/

const TONES = {
  light: {
    text: "text-[var(--c-text-mid)]",
    link:
      "text-[var(--c-green-deep)] hover:text-[var(--c-green-mid)] focus-visible:outline-[var(--c-green-deep)]",
  },
  dark: {
    text: "text-white/75",
    link:
      "text-[var(--c-gold-light)] hover:text-white focus-visible:outline-[var(--c-gold)]",
  },
  photo: {
    text: "text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]",
    link:
      "text-[var(--c-gold-light)] hover:text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] focus-visible:outline-[var(--c-gold)]",
  },
};

const ConsentNotice = ({ tone = "light", className = "", testid = "consent-notice" }) => {
  const t = TONES[tone] || TONES.light;

  return (
    <p
      data-testid={testid}
      className={`font-body font-light text-[11px] md:text-[12px] leading-[1.55] ${t.text} ${className}`}
    >
      {CONSENT_NOTICE.lead}{" "}
      <Link
        to={CONSENT_NOTICE.linkPath}
        className={`underline underline-offset-2 decoration-1 rounded-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${t.link}`}
      >
        {CONSENT_NOTICE.linkLabel}
      </Link>
      .
    </p>
  );
};

export default ConsentNotice;
