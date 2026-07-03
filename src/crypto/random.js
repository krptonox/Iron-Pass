/**
 * Generate cryptographically secure random bytes.
 *
 * @param {number} length
 * @returns {Buffer}
 */


import crypto from 'node:crypto';
import {InvalidLengthError} from '../errors/InvalidLengthError.js';

export function randomBytes(length){
    if(typeof length !== 'number' || length <= 0 || !Number.isInteger(length)){
        throw new InvalidLengthError();
    }

    const buffer = crypto.randomBytes(length);

    return buffer;
}
