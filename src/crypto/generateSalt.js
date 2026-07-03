import {randomBytes} from '../crypto/random.js';

export function generateSalt(length = 16){

    const buffer = randomBytes(length);

    return buffer.toString("hex");
}