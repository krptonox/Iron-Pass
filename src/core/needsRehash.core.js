import { decodeHash } from '../crypto/decodeHash.js';
import { validateDecodeHash } from '../validators/validateDecodeHash.js';

import {
  DEFAULT_VERSION,
  DEFAULT_ALGORITHM,
  DEFAULT_DIGEST,
  DEFAULT_ITERATIONS,
  DEFAULT_KEY_LENGTH,
} from '../constants/defaults.js';

export function needsRehash(hashedPassword) {
  const decodedHash = decodeHash(hashedPassword);

  validateDecodeHash(decodedHash);

  return (
    decodedHash.version !== DEFAULT_VERSION ||
    decodedHash.algorithm !== DEFAULT_ALGORITHM ||
    decodedHash.digest !== DEFAULT_DIGEST ||
    decodedHash.iterations !== DEFAULT_ITERATIONS ||
    decodedHash.keyLength !== DEFAULT_KEY_LENGTH
  );
}
