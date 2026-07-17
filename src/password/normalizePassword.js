import { InvalidNormalizationFormError } from '../errors/InvalidNormalizationFormError.js';

import InvalidPasswordError from '../errors/InvalidPasswordError.js';

const VALID_NORMALIZATION_FORMS = ['NFC', 'NFD', 'NFKC', 'NFKD'];

export function normalizePassword(password, form = 'NFC') {
  if (typeof password !== 'string') {
    throw new InvalidPasswordError('Password must be a string');
  }

  if (!VALID_NORMALIZATION_FORMS.includes(form)) {
    throw new InvalidNormalizationFormError('Invalid normalization form');
  }

  return password.normalize(form);
}
