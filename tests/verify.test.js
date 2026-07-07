import { encodeHash } from '../src/crypto/encodeHash.js';
import { verifyPassword } from '../src/core/verify.core.js';



const isValid = await verifyPassword('myPassword123', 'v1$pbkdf2$sha256$300000$32$04116948a6de1d33c8a095539274c0f2$dbb0c7ded0d27f7e69c43da0391b24ff299d8cdff5559e9b6bd526a34d421c45');

console.log(isValid);