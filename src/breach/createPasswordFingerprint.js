import { createHash } from 'node:crypto';

import { preparePassword } from '../password/preparePassword.js';

export function createPasswordFingerprint(password) {
  const preparedPassword = preparePassword(password);

  const hash = createHash('sha1').update(preparedPassword, 'utf8').digest('hex').toUpperCase();

  return {
    prefix: hash.slice(0, 5),
    suffix: hash.slice(5),
  };
}
