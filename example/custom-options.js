import { hash } from '../src/index.js';

const password = 'mySecurePassword123';

const hashed = await hash(password, {
  iterations: 200000,
  keyLength: 32,
  digest: 'sha256',
});

console.log('Custom hash:');
console.log(hashed);
