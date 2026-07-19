import { describe, it, expect } from "vitest";
import { formatPrice, slugify, cn } from "../utils";

describe("formatPrice", () => {
  it("formats euros with two decimals", () => {
    expect(formatPrice(29.99)).toContain("29.99");
    expect(formatPrice(29.99)).toContain("€");
  });

  it("pads whole numbers to two decimals", () => {
    expect(formatPrice(50)).toContain("50.00");
  });
});

describe("slugify", () => {
  it("lowercases and replaces spaces with dashes", () => {
    expect(slugify("Summer In Santorini")).toBe("summer-in-santorini");
  });

  it("strips non-word characters", () => {
    expect(slugify("Paris Je T'Aime!")).toBe("paris-je-taime");
  });
});

describe("cn", () => {
  it("merges class names and drops falsy values", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
});
