import { describe, it, expect } from 'vitest';

import { generateSalt } from '../src/crypto/generateSalt.js';
import { validateSalt } from '../src/validators/validateSalt.js';

import { InvalidSaltError } from '../src/errors/InvalidSaltError.js';

import {
    DEFAULT_SALT_LENGTH
} from '../src/constants/defaults.js';


describe('Salt Security', () => {

    it('should generate a salt as a string', () => {
        const salt = generateSalt();

        expect(typeof salt).toBe('string');
    });


    it('should generate salt with correct hex length', () => {
        const salt = generateSalt();

        // Each byte becomes 2 hexadecimal characters
        expect(salt.length).toBe(
            DEFAULT_SALT_LENGTH * 2
        );
    });


    it('should generate valid hexadecimal salt', () => {
        const salt = generateSalt();

        expect(
            /^[0-9a-fA-F]+$/.test(salt)
        ).toBe(true);
    });


    it('should generate different salts', () => {
        const firstSalt = generateSalt();
        const secondSalt = generateSalt();

        expect(firstSalt).not.toBe(secondSalt);
    });


    it('should generate unique salts across multiple calls', () => {
        const salts = new Set();

        for (let i = 0; i < 100; i++) {
            salts.add(generateSalt());
        }

        expect(salts.size).toBe(100);
    });


    it('should accept a valid hexadecimal salt', () => {
        expect(
            validateSalt('aabbccdd')
        ).toBe(true);
    });


    it('should reject an empty salt', () => {
        expect(
            () => validateSalt('')
        ).toThrow(InvalidSaltError);
    });


    it('should reject a non-string salt', () => {
        expect(
            () => validateSalt(12345)
        ).toThrow(InvalidSaltError);
    });


    it('should reject invalid hexadecimal salt', () => {
        expect(
            () => validateSalt('NOTHEX')
        ).toThrow(InvalidSaltError);
    });


    it('should reject odd-length hexadecimal salt', () => {
        expect(
            () => validateSalt('abc')
        ).toThrow(InvalidSaltError);
    });

});