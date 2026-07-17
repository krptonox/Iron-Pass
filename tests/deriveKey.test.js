import { describe, it, expect } from "vitest";
import { deriveKey } from "../src/crypto/deriveKey.js";
import { generateSalt } from "../src/crypto/generateSalt.js";

describe("deriveKey()", () => {
  it("should return a Buffer", async () => {
    const salt = generateSalt();

    const key = await deriveKey("password123", salt, {
      iterations: 100000,
      keyLength: 32,
      digest: "sha256",
    });

    expect(Buffer.isBuffer(key)).toBe(true);
  });

  it("should return consistent length output", async () => {
    const salt = generateSalt();

    const key = await deriveKey("password123", salt, {
      iterations: 100000,
      keyLength: 32,
      digest: "sha256",
    });

    expect(key.length).toBe(32);
  });
});
