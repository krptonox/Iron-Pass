import crypto from 'node:crypto';

import { InvalidLengthError } from '../errors/InvalidLengthError.js';

import { MAX_RANDOM_BYTES_LENGTH } from '../constants/defaults.js';

export function randomBytes(length) {
  if (typeof length !== 'number' || !Number.isInteger(length) || length <= 0) {
    throw new InvalidLengthError();
  }

  if (length > MAX_RANDOM_BYTES_LENGTH) {
    throw new InvalidLengthError(`Length cannot exceed ${MAX_RANDOM_BYTES_LENGTH} bytes.`);
  }

  return crypto.randomBytes(length);
}
