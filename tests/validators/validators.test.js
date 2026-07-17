import { describe, it, expect } from 'vitest';

import { validateDerivedKey } from '../../src/validators/validateDerivedKey.js';
import { validatePassword } from '../../src/validators/validatePassword.js';
import { normalizePassword } from '../../src/password/normalizePassword.js';

import InvalidPasswordError from '../../src/errors/InvalidPasswordError.js';

import {
    InvalidNormalizationFormError
} from '../../src/errors/InvalidNormalizationFormError.js';


describe('IronPass Validator Coverage', () => {

    describe('validateDerivedKey', () => {

        it('should reject a non-Buffer derived key', () => {
            expect(
                () => validateDerivedKey('not-a-buffer')
            ).toThrow();
        });


        it('should accept a valid Buffer derived key', () => {
            const derivedKey = Buffer.alloc(32);

            expect(
                () => validateDerivedKey(derivedKey)
            ).not.toThrow();
        });

    });


    describe('validatePassword', () => {

        it('should reject a non-string password directly', () => {
            expect(
                () => validatePassword(123)
            ).toThrow(InvalidPasswordError);
        });

    });


    describe('normalizePassword', () => {

        it('should reject an invalid normalization form', () => {
            expect(
                () => normalizePassword(
                    'IronPass',
                    'INVALID'
                )
            ).toThrow(
                InvalidNormalizationFormError
            );
        });

    });

});