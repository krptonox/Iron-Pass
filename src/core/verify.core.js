import { decodeHash } from '../crypto/decodeHash.js';

import { encodeHash } from '../crypto/encodeHash.js';

import { deriveKey } from '../crypto/deriveKey.js';

import { validateDecodeHash } from '../validators/validateDecodeHash.js';

import { preparePassword } from '../password/preparePassword.js';

export async function verifyPassword(password, hashedPassword){

    const preparedPassword = preparePassword(password);

    const decodedHash = decodeHash(hashedPassword);

    validateDecodeHash(decodedHash);

    const derivedKey = await deriveKey(
        preparedPassword,
        decodedHash.salt,
        {
            iterations: decodedHash.iterations,
            keyLength: decodedHash.keyLength,
            digest: decodedHash.digest
        }
    );

    const encodedHash = encodeHash(
        derivedKey,
        decodedHash.salt,
        {
            iterations: decodedHash.iterations,
            keyLength: decodedHash.keyLength,
            digest: decodedHash.digest
        }
    );

    return encodedHash === hashedPassword;
}