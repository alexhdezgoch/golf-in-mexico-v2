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

  it("includes a PostalAddress with locality and country", () => {
    expect(schema.address["@type"]).toBe("PostalAddress");
    expect(schema.address.addressLocality).toBeTruthy();
    expect(schema.address.addressCountry).toMatch(/^[A-Z]{2}$/);
  });
});
