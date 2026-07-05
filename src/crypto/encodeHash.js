import { DEFAULT_ALGORITHM, DEFAULT_VERSION, DEFAULT_DIGEST, DEFAULT_ITERATIONS, DEFAULT_KEY_LENGTH } from "../constants/defaults.js";

import { validateSalt } from "../validators/validateSalt.js";

import { validateDerivedKey } from "../validators/validateDerivedKey.js";

import { validateOptions } from "../validators/validateDeriveKeyOptions.js";



export function encodeHash(derivedKey, salt, options={}){

    validateSalt(salt);
    validateDerivedKey(derivedKey);
    validateOptions(options);

    const version = DEFAULT_VERSION;
    const algorithm = DEFAULT_ALGORITHM;
    
    const {
        iterations = DEFAULT_ITERATIONS,
        keyLength = DEFAULT_KEY_LENGTH,
        digest = DEFAULT_DIGEST,
    } = options;

    const derivedKeyHex = derivedKey.toString("hex");

    const hash = `${version}$${algorithm}$${digest}$${iterations}$${keyLength}$${salt}$${derivedKeyHex}`

    return hash;

}