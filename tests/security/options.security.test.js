import { describe, it, expect } from 'vitest';

import { hash } from '../../src/core/hash.core.js';

import { verifyPassword } from '../../src/core/verify.core.js';

import {
    MIN_ITERATIONS,
    MAX_ITERATIONS,
    MIN_KEY_LENGTH,
    MAX_KEY_LENGTH
} from '../../src/constants/defaults.js';

describe('IronPass Options Security', () => {

    it('should accept MIN_ITERATIONS', async () => {
    const hashedPassword = await hash(
        'IronPass@123',
        {
            iterations: MIN_ITERATIONS
        }
    );

    expect(typeof hashedPassword).toBe('string');
});


it('should accept MAX_ITERATIONS', async () => {
    const hashedPassword = await hash(
        'IronPass@123',
        {
            iterations: MAX_ITERATIONS
        }
    );

    expect(typeof hashedPassword).toBe('string');
});


it('should accept MIN_KEY_LENGTH', async () => {
    const hashedPassword = await hash(
        'IronPass@123',
        {
            keyLength: MIN_KEY_LENGTH
        }
    );

    expect(typeof hashedPassword).toBe('string');
});


it('should accept MAX_KEY_LENGTH', async () => {
    const hashedPassword = await hash(
        'IronPass@123',
        {
            keyLength: MAX_KEY_LENGTH
        }
    );

    expect(typeof hashedPassword).toBe('string');
});

it('should hash and verify with valid custom options', async () => {
    const password = 'IronPass@123';

    const hashedPassword = await hash(password, {
        iterations: MIN_ITERATIONS,
        keyLength: MIN_KEY_LENGTH,
        digest: 'sha512'
    });

    // Requires importing verifyPassword
    const result = await verifyPassword(
        password,
        hashedPassword
    );

    expect(result).toBe(true);
});

    it('should reject iterations below the minimum', async () => {
        await expect(
            hash('IronPass@123', {
                iterations: 1
            })
        ).rejects.toThrow();
    });


    it('should reject excessive iterations', async () => {
        await expect(
            hash('IronPass@123', {
                iterations: 999999999
            })
        ).rejects.toThrow();
    });


    it('should reject non-integer iterations', async () => {
        await expect(
            hash('IronPass@123', {
                iterations: 300000.5
            })
        ).rejects.toThrow();
    });


    it('should reject keyLength below the minimum', async () => {
        await expect(
            hash('IronPass@123', {
                keyLength: 1
            })
        ).rejects.toThrow();
    });


    it('should reject excessive keyLength', async () => {
        await expect(
            hash('IronPass@123', {
                keyLength: 999999
            })
        ).rejects.toThrow();
    });


    it('should reject an unsupported digest', async () => {
        await expect(
            hash('IronPass@123', {
                digest: 'md5'
            })
        ).rejects.toThrow();
    });


    it('should reject an unknown option', async () => {
        await expect(
            hash('IronPass@123', {
                unknownOption: true
            })
        ).rejects.toThrow();
    });

});