import { describe, it, expect } from "vitest";

import { hash } from "../src/core/hash.core.js";
import { needsRehash } from "../src/core/needsRehash.core.js";

import { MIN_ITERATIONS, MIN_KEY_LENGTH } from "../src/constants/defaults.js";

describe("needsRehash", () => {
  it("should return false for a hash using current defaults", async () => {
    const hashedPassword = await hash("IronPass@123");

    expect(needsRehash(hashedPassword)).toBe(false);
  });

  it("should return true for outdated iterations", async () => {
    const hashedPassword = await hash("IronPass@123", {
      iterations: MIN_ITERATIONS,
    });

    expect(needsRehash(hashedPassword)).toBe(true);
  });

  it("should return true for outdated key length", async () => {
    const hashedPassword = await hash("IronPass@123", {
      keyLength: MIN_KEY_LENGTH,
    });

    expect(needsRehash(hashedPassword)).toBe(true);
  });

  it("should return true for a different supported digest", async () => {
    const hashedPassword = await hash("IronPass@123", {
      digest: "sha512",
    });

    expect(needsRehash(hashedPassword)).toBe(true);
  });
});
