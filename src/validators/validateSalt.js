import { InvalidSaltError } from '../errors/InvalidSaltError.js';

export function validateSalt(salt) {
  if (typeof salt !== 'string') {
    throw new InvalidSaltError('Salt must be a string');
  }

  if (salt.length === 0) {
    throw new InvalidSaltError('Salt cannot be empty');
  }

  if (salt.length % 2 !== 0) {
    throw new InvalidSaltError('Salt must contain an even number of hexadecimal characters');
  }

  if (!/^[0-9a-fA-F]+$/.test(salt)) {
    throw new InvalidSaltError('Salt must be a valid hexadecimal string');
  }

  return true;
}
