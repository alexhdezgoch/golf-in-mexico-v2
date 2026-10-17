// The visitor's cookie choice, shared with the trip builder app on this domain (components/site/Measurement.tsx there):
// same key, same rules, so a choice made on one page holds on every page.
//   - "yes" / "no" are remembered in localStorage under "gim-cookies".
//   - Where the law asks for a yes first (the EU, the UK and their neighbours, told by the visitor's clock, not their
//     address), nothing loads until the visitor accepts.
//   - A browser that sends Global Privacy Control is taken at its word: nothing loads.

export const CONSENT_KEY = "gim-cookies";

export const storedChoice = () => {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "yes" || v === "no" ? v : null;
  } catch (e) {
    return null;
  }
};

export const askFirst = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    return tz.startsWith("Europe/") || /^Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe)$/.test(tz);
  } catch (e) {
    return false;
  }
};

export const optedOutByBrowser = () => typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;

/** May measurement run on this page right now? */
export const measurementAllowed = () => {
  const choice = storedChoice();
  if (choice) return choice === "yes";
  return !optedOutByBrowser() && !askFirst();
};

export const saveChoice = (choice) => {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch (e) {
    // ignore storage errors
  }
};
