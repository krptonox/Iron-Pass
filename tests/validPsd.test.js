import { describe, it, expect } from "vitest";
import { validatePassword } from "../src/validators/validatePassword.js";

describe("validatePassword()", () => {
  it("should accept valid password", () => {
    expect(() => validatePassword("jaiHo123")).not.toThrow();
  });

  it("should reject empty password", () => {
    expect(() => validatePassword("")).toThrow();
  });
});
