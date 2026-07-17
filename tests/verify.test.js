import { describe, it, expect } from "vitest";

import { hash } from "../src/core/hash.core.js";

import { verifyPassword } from "../src/core/verify.core.js";

describe("verifyPassword", () => {
  it("should verify canonically equivalent Unicode passwords", async () => {
    const composed = "\u00E9";
    const decomposed = "e\u0301";

    const hashedPassword = await hash(composed);

    const result = await verifyPassword(decomposed, hashedPassword);

    expect(result).toBe(true);
  });
});
