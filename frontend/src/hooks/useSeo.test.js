import { orgSchema } from "./useSeo";

describe("orgSchema", () => {
  const schema = orgSchema();

  it("is an Organization", () => {
    expect(schema["@type"]).toBe("Organization");
  });

  it("includes a contactPoint with email, phone and contactType", () => {
    expect(schema.contactPoint["@type"]).toBe("ContactPoint");
    expect(schema.contactPoint.contactType).toBeTruthy();
    expect(schema.contactPoint.email).toMatch(/^[^@\s]+@golf-in-mexico\.com$/);
    expect(schema.contactPoint.telephone).toMatch(/^\+\d/);
  });

  it("links the brand's own profiles in sameAs, not the founders'", () => {
    expect(schema.sameAs).toEqual([
      "https://www.instagram.com/golf.inmexico/",
      "https://www.facebook.com/people/Golf-In-Mexico/61590265455260/",
      "https://www.linkedin.com/company/golfinmexico/",
      "https://www.youtube.com/@golf.inmexico",
    ]);
    const founders = schema.founder.flatMap((f) => f.sameAs);
    expect(founders.length).toBeGreaterThan(0);
    founders.forEach((url) => expect(schema.sameAs).not.toContain(url));
  });

  it("includes a PostalAddress with locality and country", () => {
    expect(schema.address["@type"]).toBe("PostalAddress");
    expect(schema.address.addressLocality).toBeTruthy();
    expect(schema.address.addressCountry).toMatch(/^[A-Z]{2}$/);
  });
});
