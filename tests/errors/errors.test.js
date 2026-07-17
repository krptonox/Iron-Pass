import { describe, it, expect } from 'vitest';

import InvalidHashError from '../../src/errors/InvalidHashError.js';
import InvalidOptionsError from '../../src/errors/InvalidOptionsError.js';
import InvalidPasswordError from '../../src/errors/InvalidPasswordError.js';

import { InvalidLengthError } from '../../src/errors/InvalidLengthError.js';
import { InvalidSaltError } from '../../src/errors/InvalidSaltError.js';
import { InvalidNormalizationFormError } from '../../src/errors/InvalidNormalizationFormError.js';


describe('IronPass Custom Errors', () => {

    it('should create InvalidHashError correctly', () => {
        const error = new InvalidHashError('Invalid hash');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(InvalidHashError);
        expect(error.name).toBe('InvalidHashError');
        expect(error.message).toBe('Invalid hash');
    });


    it('should create InvalidOptionsError correctly', () => {
        const error = new InvalidOptionsError('Invalid options');

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('InvalidOptionsError');
        expect(error.message).toBe('Invalid options');
    });


    it('should create InvalidPasswordError correctly', () => {
        const error = new InvalidPasswordError('Invalid password');

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('InvalidPasswordError');
        expect(error.message).toBe('Invalid password');
    });


    it('should create InvalidSaltError correctly', () => {
        const error = new InvalidSaltError('Invalid salt');

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('InvalidSaltError');
        expect(error.message).toBe('Invalid salt');
    });


    it('should create InvalidLengthError correctly', () => {
        const error = new InvalidLengthError('Invalid length');

        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('InvalidLengthError');
        expect(error.message).toBe('Invalid length');
    });


    it('should create InvalidNormalizationFormError correctly', () => {
        const error =
            new InvalidNormalizationFormError(
                'Invalid normalization'
            );

        expect(error).toBeInstanceOf(Error);
        expect(error.name)
            .toBe('InvalidNormalizationFormError');
        expect(error.message)
            .toBe('Invalid normalization');
    });

});