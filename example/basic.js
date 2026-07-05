import { hash } from '../src/index.js';

const password = 'mySecurePassword123';

const hashed = await hash(password);

console.log('Hashed password:');
console.log(hashed);