import { describe, it, expect } from 'vitest';
import { generateSalt } from '../src/crypto/generateSalt.js';

describe('generateSalt()', () => {
    it('should generate a salt string', () => {
        const salt = generateSalt();

        expect(typeof salt).toBe('string');
        expect(salt.length).toBeGreaterThan(0);
    });

    it('should generate unique salts', () => {
        const s1 = generateSalt();
        const s2 = generateSalt();

        expect(s1).not.toBe(s2);
    });
});