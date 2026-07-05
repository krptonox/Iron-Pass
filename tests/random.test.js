import { describe, it, expect } from 'vitest';
import { generateSalt } from '../src/crypto/generateSalt.js';

describe('random generation', () => {
    it('should generate random values', () => {
        const values = new Set();

        for (let i = 0; i < 10; i++) {
            values.add(generateSalt());
        }

        expect(values.size).toBeGreaterThan(1);
    });
});