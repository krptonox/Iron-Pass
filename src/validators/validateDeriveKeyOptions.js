import InvalidOptionsError from '../errors/InvalidOptionsError.js';

import {
  MIN_ITERATIONS,
  MAX_ITERATIONS,
  MIN_KEY_LENGTH,
  MAX_KEY_LENGTH,
} from '../constants/defaults.js';

export function validateOptions(options) {
  const VALID_KEYS = ['iterations', 'keyLength', 'digest'];

  if (!options || typeof options !== 'object') {
    throw new InvalidOptionsError('Options must be an object');
  }

  for (const key of Object.keys(options)) {
    // Reject unknown options
    if (!VALID_KEYS.includes(key)) {
      throw new InvalidOptionsError(`Invalid option provided: ${key}`);
    }

    // Validate iterations
    if (
      key === 'iterations' &&
      (!Number.isInteger(options[key]) ||
        options[key] < MIN_ITERATIONS ||
        options[key] > MAX_ITERATIONS)
    ) {
      throw new InvalidOptionsError(
        `Iterations must be an integer between ${MIN_ITERATIONS} and ${MAX_ITERATIONS}`
      );
    }

    // Validate keyLength
    if (
      key === 'keyLength' &&
      (!Number.isInteger(options[key]) ||
        options[key] < MIN_KEY_LENGTH ||
        options[key] > MAX_KEY_LENGTH)
    ) {
      throw new InvalidOptionsError(
        `Key length must be an integer between ${MIN_KEY_LENGTH} and ${MAX_KEY_LENGTH}`
      );
    }

    // Validate digest
    if (key === 'digest' && !['sha256', 'sha512'].includes(options[key])) {
      throw new InvalidOptionsError(
        `Invalid value for option ${key}. Must be either 'sha256' or 'sha512'.`
      );
    }
  }
}
