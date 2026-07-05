import { deriveKey } from '../src/crypto/deriveKey.js';
import { generateSalt } from '../src/crypto/generateSalt.js';

const salt = generateSalt();
console.log('Salt:', salt);

const password = 'mySecurePassword';

const derivedKey = await deriveKey(password, salt,{iterations: "9", keyLength: 0, digest: 'sha256'});

console.log('Derived Key Buffer:', derivedKey);

console.log('Derived Key (Hex):', derivedKey.toString('hex'));