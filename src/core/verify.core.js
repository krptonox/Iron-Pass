import { decodeHash } from '../crypto/decodeHash.js';
import { deriveKey } from '../crypto/deriveKey.js';
import { validateDecodeHash } from '../validators/validateDecodeHash.js';
import { preparePassword } from '../password/preparePassword.js';

import { timingSafeEqual } from 'node:crypto';

export async function verifyPassword(password, hashedPassword) {

    // Prepare / normalize password
    const preparedPassword = preparePassword(password);

    // Decode stored hash
    const decodedHash = decodeHash(
        hashedPassword
    );

    // Validate hash metadata before PBKDF2
    validateDecodeHash(decodedHash);

    // Derive key using stored parameters
    const derivedKey = await deriveKey(
    preparedPassword,
    decodedHash.salt,
    {
        iterations: decodedHash.iterations,
        keyLength: decodedHash.keyLength,
        digest: decodedHash.digest
    }
    );

    // Convert stored derived key from hex
    const storedDerivedKey = Buffer.from(
        decodedHash.derivedKey,
        'hex'
    );

    if (
        derivedKey.length !==
        storedDerivedKey.length
    ) {
        return false;
    }

    // Constant-time comparison
    return timingSafeEqual(
        derivedKey,
        storedDerivedKey
    );
}

export async function verifyPassword(password, hashedPassword) {

    // Prepare / normalize password
    const preparedPassword = preparePassword(password);

    // Decode stored hash
    const decodedHash = decodeHash(
        hashedPassword
    );

    // Validate hash metadata before PBKDF2
    validateDecodeHash(decodedHash);

    // Derive key using stored parameters
    const derivedKey = await deriveKey(
    preparedPassword,
    decodedHash.salt,
    {
        iterations: decodedHash.iterations,
        keyLength: decodedHash.keyLength,
        digest: decodedHash.digest
    }
    );

    // Convert stored derived key from hex
    const storedDerivedKey = Buffer.from(
        decodedHash.derivedKey,
        'hex'
    );

    if (
        derivedKey.length !==
        storedDerivedKey.length
    ) {
        return false;
    }

    // Constant-time comparison
    return timingSafeEqual(
        derivedKey,
        storedDerivedKey
    );
}