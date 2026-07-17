import { describe, it, expect } from "vitest";

import { hash } from "../../src/core/hash.core.js";
import { verifyPassword } from "../../src/core/verify.core.js";

import InvalidHashError from "../../src/errors/InvalidHashError.js";

describe("IronPass Hash Security", () => {
  it("should generate different hashes for the same password", async () => {
    const password = "IronPass@123";

    const hashOne = await hash(password);
    const hashTwo = await hash(password);

    expect(hashOne).not.toBe(hashTwo);
  });

  it("should verify both independently salted hashes", async () => {
    const password = "IronPass@123";

    const hashOne = await hash(password);
    const hashTwo = await hash(password);

    expect(await verifyPassword(password, hashOne)).toBe(true);

    expect(await verifyPassword(password, hashTwo)).toBe(true);
  });

  it("should reject a wrong password against a valid hash", async () => {
    const hashedPassword = await hash("CorrectPassword123");

    const result = await verifyPassword("WrongPassword123", hashedPassword);

    expect(result).toBe(false);
  });

  it("should reject a hash with a tampered derived key", async () => {
    const password = "IronPass@123";

    const hashedPassword = await hash(password);

    const parts = hashedPassword.split("$");

    const derivedKey = parts[6];

    const firstCharacter = derivedKey[0] === "a" ? "b" : "a";

    parts[6] = firstCharacter + derivedKey.slice(1);

    const tamperedHash = parts.join("$");

    const result = await verifyPassword(password, tamperedHash);

    expect(result).toBe(false);
  });

  it("should reject a hash with a tampered salt", async () => {
    const password = "IronPass@123";

    const hashedPassword = await hash(password);

    const parts = hashedPassword.split("$");

    const salt = parts[5];

    const firstCharacter = salt[0] === "a" ? "b" : "a";

    parts[5] = firstCharacter + salt.slice(1);

    const tamperedHash = parts.join("$");

    const result = await verifyPassword(password, tamperedHash);

    expect(result).toBe(false);
  });

  it("should reject tampered algorithm metadata", async () => {
    const hashedPassword = await hash("IronPass@123");

    const parts = hashedPassword.split("$");

    parts[1] = "unknown";

    const tamperedHash = parts.join("$");

    await expect(verifyPassword("IronPass@123", tamperedHash)).rejects.toThrow(InvalidHashError);
  });
});
