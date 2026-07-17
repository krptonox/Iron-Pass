import { generateSalt } from "../crypto/generateSalt.js";

import { deriveKey } from "../crypto/deriveKey.js";

import { encodeHash } from "../crypto/encodeHash.js";

import { preparePassword } from "../password/preparePassword.js";

export async function hash(password, options = {}) {
  const preparedPassword = preparePassword(password);

  const salt = generateSalt();

  const derivedKey = await deriveKey(preparedPassword, salt, options);

  const encodedHash = encodeHash(derivedKey, salt, options);

  return encodedHash;
}
