import { normalizePassword } from '../password/normalizePassword.js';

import { validatePassword } from '../validators/validatePassword.js';

import { generateSalt } from '../crypto/generateSalt.js';

import { deriveKey } from '../crypto/deriveKey.js';

import { encodeHash } from '../crypto/encodeHash.js';


export async function hash(password, options = {}){
    
    const normalizedPassword = normalizePassword(password);

    const validatedPassword = validatePassword(normalizedPassword);

    const salt = generateSalt();

    const  derivedKey = await deriveKey(validatedPassword, salt, options);

    const encodedHash = encodeHash(derivedKey, salt, options);

    return encodedHash;
}