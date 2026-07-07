import {
    DEFAULT_VERSION,
    DEFAULT_ALGORITHM,
    DEFAULT_DIGEST
} from "../constants/defaults.js";

import InvalidHashError from "../errors/InvalidHashError.js";

export function validateDecodeHash(decodedHash) {
   if (
    typeof decodedHash !== "object" ||
    decodedHash === null
    ) {
    throw new InvalidHashError("Decoded hash must be an object.");
    }

    const { version, algorithm, digest, iterations, keyLength, salt, derivedKey } = decodedHash;

    if (version !== DEFAULT_VERSION) {
        throw new InvalidHashError(`Invalid version: ${version}. Expected '${DEFAULT_VERSION}'`);
    }

    if (algorithm !== DEFAULT_ALGORITHM) {
        throw new InvalidHashError(`Invalid algorithm: ${algorithm}. Expected '${DEFAULT_ALGORITHM}'`);
    }

    if (typeof digest !== 'string' || !['sha256', 'sha512'].includes(digest)) {
        throw new InvalidHashError(`Invalid digest: ${digest}. Expected '${DEFAULT_DIGEST}'`);
    }

    if (!Number.isInteger(iterations) || iterations <= 0) {
        throw new InvalidHashError(`Invalid iterations: ${iterations}. Expected a positive integer`);
    }

    if (!Number.isInteger(keyLength) || keyLength <= 0) {
        throw new InvalidHashError(`Invalid key length: ${keyLength}. Expected a positive integer`);
    }

    if (typeof salt !== 'string') {
        throw new InvalidHashError(`Invalid salt: ${salt}. Expected a string`);
    }

    if (typeof derivedKey !== 'string') {
        throw new InvalidHashError(`Invalid derived key: ${derivedKey}. Expected a string`);
    }
}