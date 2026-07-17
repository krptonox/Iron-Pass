import InvalidHashError from '../errors/InvalidHashError.js';

export function decodeHash(hashedPassword) {
  if (typeof hashedPassword !== 'string') {
    throw new InvalidHashError('Hashed password must be a string');
  }

  if (hashedPassword.length === 0) {
    throw new InvalidHashError('Hashed password cannot be empty');
  }

  const parts = hashedPassword.split('$');

  if (parts.length !== 7) {
    throw new InvalidHashError('Invalid hash format');
  }

  const [version, algorithm, digest, iterations, keyLength, salt, derivedKey] = parts;

  return {
    version,
    algorithm,
    digest,
    iterations: Number(iterations),
    keyLength: Number(keyLength),
    salt,
    derivedKey,
  };
}
