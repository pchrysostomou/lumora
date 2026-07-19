import { describe, it, expect } from "vitest";
import { calculatePrice, PRODUCTS, SIZE_UPGRADES, COVER_UPGRADES, PRICE_PER_EXTRA_PAGE, CATEGORY_GRADIENTS } from "../data";

describe("calculatePrice", () => {
  it("returns the base price for minimum pages, base size and cover", () => {
    expect(calculatePrice(29.99, 20, 20, "A5", "softcover")).toBeCloseTo(29.99);
  });

  it("charges for extra pages beyond the minimum", () => {
    expect(calculatePrice(29.99, 20, 30, "A5", "softcover")).toBeCloseTo(29.99 + 10 * PRICE_PER_EXTRA_PAGE);
  });

  it("never charges negative extra pages when below minimum", () => {
    expect(calculatePrice(29.99, 20, 10, "A5", "softcover")).toBeCloseTo(29.99);
  });

  it("adds size and cover upgrades", () => {
    expect(calculatePrice(30, 20, 20, "square_20", "leather")).toBeCloseTo(30 + SIZE_UPGRADES.square_20 + COVER_UPGRADES.leather);
  });

  it("combines pages, size and cover charges", () => {
    const price = calculatePrice(24.99, 20, 40, "A4_portrait", "hardcover");
    expect(price).toBeCloseTo(24.99 + 20 * PRICE_PER_EXTRA_PAGE + SIZE_UPGRADES.A4_portrait + COVER_UPGRADES.hardcover);
  });
});

describe("PRODUCTS catalogue", () => {
  it("has unique ids and slugs", () => {
    const ids = PRODUCTS.map(p => p.id);
    const slugs = PRODUCTS.map(p => p.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every product has valid pricing and page limits", () => {
    for (const p of PRODUCTS) {
      expect(p.basePrice).toBeGreaterThan(0);
      expect(p.minPages).toBeGreaterThan(0);
      expect(p.maxPages).toBeGreaterThanOrEqual(p.minPages);
      expect(p.availableSizes.length).toBeGreaterThan(0);
      expect(p.availableCovers.length).toBeGreaterThan(0);
    }
  });

  it("every product category has a gradient", () => {
    for (const p of PRODUCTS) {
      expect(CATEGORY_GRADIENTS[p.category]).toBeTruthy();
    }
  });
});
