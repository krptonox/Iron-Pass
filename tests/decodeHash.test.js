import { describe, it } from "vitest";
import assert from "node:assert/strict";

import { decodeHash } from "../src/crypto/decodeHash.js";

describe("decodeHash()", () => {
  it("should decode a valid encoded hash", () => {
    const decodedHash = decodeHash(
      "v1$pbkdf2$sha256$100000$64$3dce24efc037de17cde430476301f204$bde640b7f14be8b6be927cfafa05f87558601a301df29f3aedf55bf0f4ed0c78c737f75ec48223871fd7a39151c21654a31017d9c46c90250bc42dd8df81abb0"
    );

    assert.equal(decodedHash.version, "v1");
    assert.equal(decodedHash.algorithm, "pbkdf2");
    assert.equal(decodedHash.digest, "sha256");
    assert.equal(decodedHash.iterations, 100000);
    assert.equal(decodedHash.keyLength, 64);
    assert.equal(decodedHash.salt, "3dce24efc037de17cde430476301f204");
    assert.equal(
      decodedHash.derivedKey,
      "bde640b7f14be8b6be927cfafa05f87558601a301df29f3aedf55bf0f4ed0c78c737f75ec48223871fd7a39151c21654a31017d9c46c90250bc42dd8df81abb0"
    );
  });
});
