import { describe, it, expect } from "vitest";

import { randomBytes } from "../src/crypto/random.js";

import { InvalidLengthError } from "../src/errors/InvalidLengthError.js";

import { MAX_RANDOM_BYTES_LENGTH } from "../src/constants/defaults.js";

describe("randomBytes", () => {
  it("should return a Buffer of the requested length", () => {
    const result = randomBytes(16);

    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.length).toBe(16);
  });

  it("should generate different random values", () => {
    const first = randomBytes(16);
    const second = randomBytes(16);

    expect(first.equals(second)).toBe(false);
  });

  it("should reject zero length", () => {
    expect(() => randomBytes(0)).toThrow(InvalidLengthError);
  });

  it("should reject negative length", () => {
    expect(() => randomBytes(-1)).toThrow(InvalidLengthError);
  });

  it("should reject decimal length", () => {
    expect(() => randomBytes(16.5)).toThrow(InvalidLengthError);
  });

  it("should reject non-number length", () => {
    expect(() => randomBytes("16")).toThrow(InvalidLengthError);
  });

  it("should reject length above maximum", () => {
    expect(() => randomBytes(MAX_RANDOM_BYTES_LENGTH + 1)).toThrow(InvalidLengthError);
  });
});
