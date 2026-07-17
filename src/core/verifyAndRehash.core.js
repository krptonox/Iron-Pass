import { verifyPassword } from './verify.core.js';
import { needsRehash } from './needsRehash.core.js';
import { hash } from './hash.core.js';


export async function verifyAndRehash(
    password,
    hashedPassword
) {
    const valid = await verifyPassword(
        password,
        hashedPassword
    );

    if (!valid) {
        return {
            valid: false,
            rehashed: false,
            hash: null
        };
    }

    if (!needsRehash(hashedPassword)) {
        return {
            valid: true,
            rehashed: false,
            hash: null
        };
    }

    const newHash = await hash(password);

    return {
        valid: true,
        rehashed: true,
        hash: newHash
    };
}