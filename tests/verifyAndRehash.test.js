import { describe, it, expect } from 'vitest';

import { hash } from '../src/core/hash.core.js';
import {
    verifyAndRehash
} from '../src/core/verifyAndRehash.core.js';

import {
    MIN_ITERATIONS
} from '../src/constants/defaults.js';

import {
    verifyPassword
} from '../src/core/verify.core.js';

import { needsRehash } from '../src/core/needsRehash.core.js';

describe('verifyAndRehash', () => {

    it('should reject an incorrect password', async () => {
        const hashedPassword = await hash(
            'CorrectPassword123'
        );

        const result = await verifyAndRehash(
            'WrongPassword123',
            hashedPassword
        );

        expect(result).toEqual({
            valid: false,
            rehashed: false,
            hash: null
        });
    });


    it('should verify without rehashing a current hash', async () => {
        const password = 'IronPass@123';

        const hashedPassword = await hash(password);

        const result = await verifyAndRehash(
            password,
            hashedPassword
        );

        expect(result).toEqual({
            valid: true,
            rehashed: false,
            hash: null
        });
    });

    it('should create a valid upgraded hash', async () => {
    const password = 'IronPass@123';

    const oldHash = await hash(
        password,
        {
            iterations: MIN_ITERATIONS
        }
    );

    const result = await verifyAndRehash(
        password,
        oldHash
    );

    expect(result.rehashed).toBe(true);

    const valid = await verifyPassword(
        password,
        result.hash
    );

    expect(valid).toBe(true);
});


    it('should generate a new hash for an outdated hash', async () => {
        const password = 'IronPass@123';

        const oldHash = await hash(
            password,
            {
                iterations: MIN_ITERATIONS
            }
        );

        const result = await verifyAndRehash(
            password,
            oldHash
        );

        expect(result.valid).toBe(true);
        expect(result.rehashed).toBe(true);

        expect(typeof result.hash).toBe(
            'string'
        );

        expect(result.hash).not.toBe(
            oldHash
        );

        expect(
    needsRehash(result.hash)
).toBe(false);
    });
});