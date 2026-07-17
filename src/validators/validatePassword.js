import InvalidPasswordError from '../errors/InvalidPasswordError.js';

import { MAX_PASSWORD_LENGTH } from '../constants/defaults.js';

export function validatePassword(password) {
  if (typeof password !== 'string') {
    throw new InvalidPasswordError('Password must be a string');
  }

  if (password.length === 0) {
    throw new InvalidPasswordError('Password cannot be empty');
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    throw new InvalidPasswordError(`Password cannot exceed ${MAX_PASSWORD_LENGTH} characters`);
  }

  return password;
}
