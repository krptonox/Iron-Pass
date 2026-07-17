import {
  DEFAULT_VERSION,
  DEFAULT_ALGORITHM,
  DEFAULT_DIGEST,
  MIN_ITERATIONS,
  MAX_ITERATIONS,
  MIN_KEY_LENGTH,
  MAX_KEY_LENGTH,
} from '../constants/defaults.js';

import InvalidHashError from '../errors/InvalidHashError.js';

function isValidHex(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length % 2 === 0 &&
    /^[0-9a-fA-F]+$/.test(value)
  );
}

export function validateDecodeHash(decodedHash) {
  if (typeof decodedHash !== 'object' || decodedHash === null) {
    throw new InvalidHashError('Decoded hash must be an object.');
  }

  const { version, algorithm, digest, iterations, keyLength, salt, derivedKey } = decodedHash;

  if (version !== DEFAULT_VERSION) {
    throw new InvalidHashError(`Invalid version: ${version}. Expected '${DEFAULT_VERSION}'`);
  }

  if (algorithm !== DEFAULT_ALGORITHM) {
    throw new InvalidHashError(`Invalid algorithm: ${algorithm}. Expected '${DEFAULT_ALGORITHM}'`);
  }

  if (typeof digest !== 'string' || !['sha256', 'sha512'].includes(digest)) {
    throw new InvalidHashError(`Invalid digest: ${digest}. Expected '${DEFAULT_DIGEST}'`);
  }

  // Validate iterations type and positive value
  if (!Number.isInteger(iterations) || iterations <= 0) {
    throw new InvalidHashError(`Invalid iterations: ${iterations}. Expected a positive integer`);
  }

  // Validate iteration security/resource boundaries
  if (iterations < MIN_ITERATIONS || iterations > MAX_ITERATIONS) {
    throw new InvalidHashError(
      `Iterations must be between ${MIN_ITERATIONS} and ${MAX_ITERATIONS}`
    );
  }

  // Validate keyLength type and positive value
  if (!Number.isInteger(keyLength) || keyLength <= 0) {
    throw new InvalidHashError(`Invalid key length: ${keyLength}. Expected a positive integer`);
  }

  // Validate keyLength resource boundaries
  if (keyLength < MIN_KEY_LENGTH || keyLength > MAX_KEY_LENGTH) {
    throw new InvalidHashError(
      `Key length must be between ${MIN_KEY_LENGTH} and ${MAX_KEY_LENGTH}`
    );
  }

  // Salt must be valid hexadecimal
  if (!isValidHex(salt)) {
    throw new InvalidHashError('Hash contains an invalid salt');
  }

  // Derived key must be valid hexadecimal
  if (!isValidHex(derivedKey)) {
    throw new InvalidHashError('Hash contains an invalid derived key');
  }

  // keyLength is measured in bytes.
  // Each byte is represented by 2 hex characters.
  if (derivedKey.length !== keyLength * 2) {
    throw new InvalidHashError('Derived key length does not match keyLength');
  }
}
