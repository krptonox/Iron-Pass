import {InvalidSaltError} from '../errors/InvalidSaltError.js';

export function validateSalt(salt) {
    if (!salt) {
        throw new InvalidSaltError();
    }
    if (typeof salt !== 'string') {
        throw new InvalidSaltError('Salt must be a string');
    }
}