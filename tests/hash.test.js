import { hash } from '../src/core/hash.core.js'

const hashPassword = await hash('password123');

console.log(hashPassword);