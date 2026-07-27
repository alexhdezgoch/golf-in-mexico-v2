// Guard tests for the HubSpot form map.
//
// These exist because of a real, silent production failure: `article_newsletter`
// and `hub_playbook` shipped with `formId: ""`. isHubspotConfigured() returned
// false, submitToHubspot() resolved { ok: true, dormant: true }, and every form
// showed "Check your inbox." while the email was never POSTed anywhere. Nothing
// logged, nothing threw, and the only symptom was a contact count that quietly
// never moved. It went unnoticed for weeks.
//
// The failure had two shapes, so there are two guards:
//   1. A blank/malformed formId  → "every form has a real GUID"
//   2. A typo'd or renamed key   → "every key a component asks for exists"
//
// Both are cheap. Neither needs a DOM, a network, or any extra dependency —
// jest ships with react-scripts, so `CI=true yarn test` runs this as-is.

import fs from "fs";
import path from "path";
import { HUBSPOT_FORMS, FORM_KEYS, getFormConfig, isHubspotConfigured } from "./hubspot";

const HUBSPOT_GUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const SRC_ROOT = path.join(__dirname, "..");

// Every .js/.jsx file under src/, minus test files.
const sourceFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    if (!/\.jsx?$/.test(entry.name)) return [];
    if (/\.test\.jsx?$/.test(entry.name)) return [];
    return [full];
  });

// Call sites reference keys two ways: FORM_KEYS.foo (preferred) and the older
// bare "foo" string. Collect both so a typo in either is caught.
const referencedFormKeys = () => {
  const found = [];
  sourceFiles(SRC_ROOT).forEach((file) => {
    const code = fs.readFileSync(file, "utf8");
    const patterns = [
      /useHubspotForm\(\s*["']([^"']+)["']\s*\)/g,
      /useHubspotForm\(\s*FORM_KEYS\.([A-Za-z0-9_$]+)\s*\)/g,
    ];
    patterns.forEach((re) => {
      let match;
      while ((match = re.exec(code)) !== null) {
        found.push({ key: match[1], file: path.relative(SRC_ROOT, file) });
      }
    });
  });
  return found;
};

describe("HUBSPOT_FORMS", () => {
  test.each(Object.keys(HUBSPOT_FORMS))(
    "%s has a real HubSpot form GUID (a blank formId silently discards leads)",
    (key) => {
      // Arrange
      const { formId } = HUBSPOT_FORMS[key];

      // Act / Assert
      expect(formId).toMatch(HUBSPOT_GUID);
    }
  );

  test("exposes a FORM_KEYS entry for every form so call sites never retype a string", () => {
    // Arrange
    const mapKeys = Object.keys(HUBSPOT_FORMS).sort();

    // Act
    const exposedKeys = Object.keys(FORM_KEYS).sort();

    // Assert
    expect(exposedKeys).toEqual(mapKeys);
    // Each value must equal its own name, or FORM_KEYS.x resolves to the wrong form.
    exposedKeys.forEach((key) => expect(FORM_KEYS[key]).toBe(key));
  });

  test("aliased keys point at a GUID that a real form also uses", () => {
    // Two keys deliberately share a GUID with their general-capture equivalent
    // (article_newsletter → footer_newsletter, hub_playbook → hub_capture).
    // If someone repoints one of the sources, the alias must move with it.
    const guidOwners = Object.entries(HUBSPOT_FORMS).reduce((acc, [key, cfg]) => {
      acc[cfg.formId] = [...(acc[cfg.formId] || []), key];
      return acc;
    }, {});

    expect(guidOwners[HUBSPOT_FORMS.article_newsletter.formId]).toEqual(
      expect.arrayContaining(["article_newsletter", "footer_newsletter"])
    );
    expect(guidOwners[HUBSPOT_FORMS.hub_playbook.formId]).toEqual(
      expect.arrayContaining(["hub_playbook", "hub_capture"])
    );
  });
});

describe("form keys referenced by components", () => {
  test("finds call sites at all (guards against the scan silently matching nothing)", () => {
    expect(referencedFormKeys().length).toBeGreaterThan(0);
  });

  test("every key a component passes to useHubspotForm exists in the map", () => {
    // A key that isn't in the map used to return { ok: true } — fake success,
    // lead destroyed. It now fails loudly, but catching it here is cheaper.
    const unknown = referencedFormKeys().filter(
      ({ key }) => !Object.hasOwn(HUBSPOT_FORMS, key)
    );

    expect(unknown).toEqual([]);
  });
});

describe("getFormConfig / isHubspotConfigured", () => {
  test("returns null for an unknown key rather than a partial object", () => {
    expect(getFormConfig("definitely_not_a_form")).toBeNull();
  });

  test("reports a form as unconfigured when the portal ID is absent", () => {
    // No REACT_APP_HUBSPOT_PORTAL_ID in the jest env, so every form is dormant.
    // This is the intended pre-integration behavior — the test pins it so the
    // dormant path stays a deliberate choice rather than an accident.
    expect(isHubspotConfigured("hub_capture")).toBe(false);
  });
});
