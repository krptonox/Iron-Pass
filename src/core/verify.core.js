//TO DO
import { decodeHash } from '../crypto/decodeHash.js';
import { encodeHash } from '../crypto/encodeHash.js';
import { deriveKey } from '../crypto/deriveKey.js';

export async function verifyPassword(password, hashedPassword) {
    const DecodedHash = decodeHash(hashedPassword);
    
    const derivedKey = await deriveKey(password,DecodedHash.salt, { iterations: DecodedHash.iterations, keyLength: DecodedHash.keyLength, digest: DecodedHash.digest });

    const EncodedHash = encodeHash(derivedKey, DecodedHash.salt, { iterations: DecodedHash.iterations, keyLength: DecodedHash.keyLength, digest: DecodedHash.digest });
    
    return EncodedHash === hashedPassword;
}