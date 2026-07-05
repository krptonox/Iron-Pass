import {randomBytes} from '../crypto/random.js';
import { DEFAULT_SALT_LENGTH } from '../constants/defaults.js';
import { validateSalt } from '../validators/validateSalt.js';

export function generateSalt(length = DEFAULT_SALT_LENGTH){

    const buffer = randomBytes(length);

    validateSalt(buffer.toString('hex'));

    return buffer.toString('hex');
}