import { describe, it, expect } from 'vitest';
import { hash } from '../src/core/hash.core.js';

// describe('hash()', () => {
//     it('should return a string hash', async () => {
//         const result = await hash('myPassword123');

//         expect(typeof result).toBe('string');
//         expect(result).toContain('v1$pbkdf2');
//     });
// });


const hashedPassword = await hash('myPassword123');
console.log(hashedPassword);
