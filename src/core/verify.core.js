//TO DO
import { decodeHash } from '../crypto/decodeHash.js';
import { encodeHash } from '../crypto/encodeHash.js';
import { deriveKey } from '../crypto/deriveKey.js';

export function verifyPassword(password, hashedPassword) {
    const DecodedHash = decodeHash(hashedPassword);

    const EncodedHash = encodedHash()
}