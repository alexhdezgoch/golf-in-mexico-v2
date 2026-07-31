// Guard tests for the consent notice.
//
// The bug these exist for: lib/hubspot.js has always POSTed
// legalConsentOptions.consent = { consentToProcess: true, text: HUBSPOT_CONSENT_TEXT }
// with every submission, while the site rendered that text on exactly zero
// pages. HubSpot held consent records for wording no visitor had ever read.
//
// Three failure modes are worth pinning, none of which needs a DOM (no
// @testing-library in this project — jest ships with react-scripts and that's it):
//   1. the rendered sentence drifting from the recorded one,
//   2. the /privacy link going stale (wrong absolute URL, or no such route),
//   3. a NEW capture point shipping without a consent line at all.

import fs from "fs";
import path from "path";
import { CONSENT_NOTICE, HUBSPOT_CONSENT_TEXT } from "../config/hubspot";
import { SITE_URL } from "../hooks/useSeo";

const SRC_ROOT = path.join(__dirname, "..");
const rel = (file) => path.relative(SRC_ROOT, file).split(path.sep).join("/");
const read = (file) => fs.readFileSync(path.join(SRC_ROOT, file), "utf8");

// Files that call useHubspotForm but are NOT routed in App.js — dead code, so
// they get no consent line. Each one is re-armed by the test below: the moment
// something imports it, this exemption becomes invalid and the guard fails.
const UNROUTED = ["pages/DestinationHub.jsx", "pages/DestinationPlaceholder.jsx"];

const sourceFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    if (!/\.jsx?$/.test(entry.name)) return [];
    if (/\.test\.jsx?$/.test(entry.name)) return [];
    return [full];
  });

const captureFiles = () =>
  sourceFiles(SRC_ROOT)
    .filter((file) => /useHubspotForm\(/.test(fs.readFileSync(file, "utf8")))
    .map(rel)
    // the hook's own definition isn't a capture point
    .filter((file) => file !== "hooks/useHubspotForm.js");

describe("consent text recorded vs. rendered", () => {
  test("the text POSTed to HubSpot is the sentence the component renders", () => {
    // Arrange / Act — the component prints `lead` + a link labeled `linkLabel`.
    // Assert — the recorded string must contain both, verbatim.
    expect(HUBSPOT_CONSENT_TEXT).toContain(CONSENT_NOTICE.lead);
    expect(HUBSPOT_CONSENT_TEXT).toContain(CONSENT_NOTICE.linkLabel);
  });

  test("the recorded text resolves the link to an absolute URL a reader can follow later", () => {
    expect(HUBSPOT_CONSENT_TEXT).toContain(CONSENT_NOTICE.linkUrl);
    expect(CONSENT_NOTICE.linkUrl).toBe(`${SITE_URL}${CONSENT_NOTICE.linkPath}`);
  });

  test("the component takes all of its copy from config, so the two cannot drift", () => {
    // Arrange
    const component = read("components/ConsentNotice.jsx");

    // Assert
    expect(component).toContain("CONSENT_NOTICE.lead");
    expect(component).toContain("CONSENT_NOTICE.linkLabel");
    expect(component).toContain("CONSENT_NOTICE.linkPath");
    // No second copy of the sentence hardcoded in JSX.
    expect(component).not.toContain("By submitting");
  });

  test("the linked route actually exists in the router", () => {
    expect(read("App.js")).toContain(`path="${CONSENT_NOTICE.linkPath}"`);
  });
});

describe("every live capture point renders the notice", () => {
  test("finds capture files at all (guards against the scan matching nothing)", () => {
    expect(captureFiles().length).toBeGreaterThan(0);
  });

  test("every file that submits a lead also renders <ConsentNotice", () => {
    const missing = captureFiles().filter(
      (file) => !UNROUTED.includes(file) && !/<ConsentNotice/.test(read(file))
    );

    expect(missing).toEqual([]);
  });

  test.each(UNROUTED)(
    "%s is still unrouted — routing it would require a consent line first",
    (deadFile) => {
      // Arrange — the component name other files would import.
      const name = path.basename(deadFile).replace(/\.jsx?$/, "");

      // Act
      const importers = sourceFiles(SRC_ROOT)
        .map(rel)
        .filter((file) => file !== deadFile)
        .filter((file) => new RegExp(`import\\s+${name}\\s+from`).test(read(file)));

      // Assert
      expect(importers).toEqual([]);
    }
  );
});
