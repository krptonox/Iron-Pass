import { decodeHash } from '../crypto/decodeHash.js';

import { deriveKey } from '../crypto/deriveKey.js';

import { validateDecodeHash } from '../validators/validateDecodeHash.js';

import { preparePassword } from '../password/preparePassword.js';

import { timingSafeEqual } from 'node:crypto';

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

    const storedDerivedKey = Buffer.from(
        decodedHash.derivedKey,
        'hex'
    );

    if(derivedKey.length !== storedDerivedKey.length){
       return false;
    }

    return timingSafeEqual(
       derivedKey,
       storedDerivedKey
    ); 
}