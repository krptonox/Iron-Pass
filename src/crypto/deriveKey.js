import { DEFAULT_ITERATIONS, DEFAULT_KEY_LENGTH, DEFAULT_DIGEST } from '../constants/defaults.js';
import crypto from 'node:crypto';
import { validateOptions } from '../validators/validateDeriveKeyOptions.js';
import { validatePassword } from '../validators/validatePassword.js';
import { validateSalt } from '../validators/validateSalt.js';

export function deriveKey(password, salt, options = {}) {
  validatePassword(password);
  validateOptions(options);
  validateSalt(salt);

  const {
    iterations = DEFAULT_ITERATIONS,
    keyLength = DEFAULT_KEY_LENGTH,
    digest = DEFAULT_DIGEST,
  } = options;

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLength, digest, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey);
    });
  });
}
