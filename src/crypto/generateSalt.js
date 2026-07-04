import {randomBytes} from '../crypto/random.js';
import { DEFAULT_SALT_LENGTH } from '../constants/defaults.js';

export function generateSalt(length = DEFAULT_SALT_LENGTH){

    const buffer = randomBytes(length);

    return buffer.toString("hex");
}