import test from "node:test";
import assert from "node:assert";
import { generateDefaultSlots, defaultOffer, defaultMentor } from "../lib/data/default-content";
import { generateStructuredData } from "../lib/schema";
import { getPriceForCurrency } from "../lib/currency";

test("generateDefaultSlots produces valid upcoming dates without Sundays", () => {
  const slots = generateDefaultSlots();
  assert.ok(slots.length > 0, "Slots should not be empty");

  for (const slot of slots) {
    assert.ok(slot.id, "Slot must have an ID");
    assert.match(slot.date, /^\d{4}-\d{2}-\d{2}$/, "Slot date must be in YYYY-MM-DD format");
    assert.ok(slot.time, "Slot must have a time string");

    const day = new Date(slot.date + "T00:00:00").getDay();
    assert.notStrictEqual(day, 0, "Sundays should be excluded from default slots");
  }
});

test("generateStructuredData returns valid Schema.org graph", () => {
  const schema = generateStructuredData(defaultOffer, defaultMentor);
  assert.strictEqual(schema["@context"], "https://schema.org");
  assert.ok(Array.isArray(schema["@graph"]), "@graph should be an array");

  const person = schema["@graph"].find((item: any) => item["@type"] === "Person");
  assert.ok(person, "Must include Person entry");
  assert.strictEqual(person.name, defaultMentor.name);

  const service = schema["@graph"].find((item: any) => item["@type"] === "Service");
  assert.ok(service, "Must include Service entry");
  assert.strictEqual(service?.offers?.price, defaultOffer.currentPrice);
});

test("defaultOffer has positive prices and valid 90-min duration per spec", () => {
  assert.ok(defaultOffer.currentPrice > 0, "Current price must be positive");
  assert.ok(defaultOffer.originalPrice > defaultOffer.currentPrice, "Original price must exceed current price");
  assert.strictEqual(defaultOffer.durationMinutes, 90, "Duration must be 90 minutes per spec");
  assert.ok(defaultOffer.inclusions.length >= 4, "Must have at least 4 deliverables");
});

test("multi-currency configurations return valid localized rates", () => {
  const inr = getPriceForCurrency("INR");
  const usd = getPriceForCurrency("USD");
  const eur = getPriceForCurrency("EUR");

  assert.strictEqual(inr.symbol, "₹");
  assert.strictEqual(usd.symbol, "$");
  assert.strictEqual(eur.symbol, "€");

  assert.ok(usd.basePrice > 0);
  assert.ok(usd.originalPrice > usd.basePrice);
});
