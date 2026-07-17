import { decodeHash } from '../crypto/decodeHash.js';
import { deriveKey } from '../crypto/deriveKey.js';
import { validateDecodeHash } from '../validators/validateDecodeHash.js';
import { preparePassword } from '../password/preparePassword.js';

import { timingSafeEqual } from 'node:crypto';


export async function verifyPassword(password, hashedPassword) {

    // Prepare, normalize, and validate password
    const preparedPassword = preparePassword(password);

    // Decode stored hash
    const decodedHash = decodeHash(hashedPassword);

    // Validate hash metadata before PBKDF2
    validateDecodeHash(decodedHash);

    // Derive key using parameters stored in the hash
    const derivedKey = await deriveKey(
        preparedPassword,
        decodedHash.salt,
        {
            iterations: decodedHash.iterations,
            keyLength: decodedHash.keyLength,
            digest: decodedHash.digest
        }
    );

    // Convert stored derived key from hex to Buffer
    const storedDerivedKey = Buffer.from(
        decodedHash.derivedKey,
        'hex'
    );

    // timingSafeEqual requires equal-length buffers
    if (derivedKey.length !== storedDerivedKey.length) {
        return false;
    }

    // Constant-time comparison
    return timingSafeEqual(
        derivedKey,
        storedDerivedKey
    );
}