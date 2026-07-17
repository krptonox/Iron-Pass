import { describe, it, expect } from 'vitest';

import { encodeHash } from '../src/crypto/encodeHash.js';
import { decodeHash } from '../src/crypto/decodeHash.js';

import {
    DEFAULT_VERSION,
    DEFAULT_ALGORITHM,
    DEFAULT_DIGEST,
    DEFAULT_ITERATIONS,
    DEFAULT_KEY_LENGTH
} from '../src/constants/defaults.js';


describe('IronPass Hash Format', () => {

    it('should encode and decode hash metadata correctly', () => {

        const derivedKey = Buffer.alloc(
            DEFAULT_KEY_LENGTH,
            1
        );

        const salt =
            '00112233445566778899aabbccddeeff';

        const encodedHash = encodeHash(
            derivedKey,
            salt
        );

        const decodedHash = decodeHash(
            encodedHash
        );

        expect(decodedHash.version)
            .toBe(DEFAULT_VERSION);

        expect(decodedHash.algorithm)
            .toBe(DEFAULT_ALGORITHM);

        expect(decodedHash.digest)
            .toBe(DEFAULT_DIGEST);

        expect(decodedHash.iterations)
            .toBe(DEFAULT_ITERATIONS);

        expect(decodedHash.keyLength)
            .toBe(DEFAULT_KEY_LENGTH);

        expect(decodedHash.salt)
            .toBe(salt);

        expect(decodedHash.derivedKey)
            .toBe(derivedKey.toString('hex'));
    });


    it('should preserve custom parameters through encode and decode', () => {

        const options = {
            iterations: 100000,
            keyLength: 16,
            digest: 'sha512'
        };

        const derivedKey = Buffer.alloc(
            options.keyLength,
            1
        );

        const salt =
            '00112233445566778899aabbccddeeff';

        const encodedHash = encodeHash(
            derivedKey,
            salt,
            options
        );

        const decodedHash = decodeHash(
            encodedHash
        );

        expect(decodedHash.iterations)
            .toBe(options.iterations);

        expect(decodedHash.keyLength)
            .toBe(options.keyLength);

        expect(decodedHash.digest)
            .toBe(options.digest);
    });


    it('should produce exactly seven hash fields', () => {

        const derivedKey = Buffer.alloc(
            DEFAULT_KEY_LENGTH,
            1
        );

        const salt =
            '00112233445566778899aabbccddeeff';

        const encodedHash = encodeHash(
            derivedKey,
            salt
        );

        expect(
            encodedHash.split('$')
        ).toHaveLength(7);
    });


    it('should encode hashes using the current version', () => {

        const derivedKey = Buffer.alloc(
            DEFAULT_KEY_LENGTH,
            1
        );

        const salt =
            '00112233445566778899aabbccddeeff';

        const encodedHash = encodeHash(
            derivedKey,
            salt
        );

        expect(
            encodedHash.startsWith(
                `${DEFAULT_VERSION}$`
            )
        ).toBe(true);
    });

});