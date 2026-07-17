import {
    DEFAULT_VERSION,
    DEFAULT_ALGORITHM,
    DEFAULT_DIGEST
} from '../constants/defaults.js';

import InvalidHashError from '../errors/InvalidHashError.js';


function isValidHex(value){
    return (
        typeof value === 'string' &&
        value.length > 0 &&
        value.length % 2 === 0 &&
        /^[0-9a-fA-F]+$/.test(value)
    );
}


export function validateDecodeHash(decodedHash){

    if(
        typeof decodedHash !== 'object' ||
        decodedHash === null
    ){
        throw new InvalidHashError(
            'Decoded hash must be an object.'
        );
    }

    const {
        version,
        algorithm,
        digest,
        iterations,
        keyLength,
        salt,
        derivedKey
    } = decodedHash;


    if(version !== DEFAULT_VERSION){
        throw new InvalidHashError(
            `Invalid version: ${version}. Expected '${DEFAULT_VERSION}'`
        );
    }


    if(algorithm !== DEFAULT_ALGORITHM){
        throw new InvalidHashError(
            `Invalid algorithm: ${algorithm}. Expected '${DEFAULT_ALGORITHM}'`
        );
    }


    if(
        typeof digest !== 'string' ||
        !['sha256', 'sha512'].includes(digest)
    ){
        throw new InvalidHashError(
            `Invalid digest: ${digest}. Expected '${DEFAULT_DIGEST}'`
        );
    }


    if(
        !Number.isInteger(iterations) ||
        iterations <= 0
    ){
        throw new InvalidHashError(
            `Invalid iterations: ${iterations}. Expected a positive integer`
        );
    }


    if(
        !Number.isInteger(keyLength) ||
        keyLength <= 0
    ){
        throw new InvalidHashError(
            `Invalid key length: ${keyLength}. Expected a positive integer`
        );
    }

    // Salt must be valid hexadecimal
    if(!isValidHex(salt)){
        throw new InvalidHashError(
            'Hash contains an invalid salt'
        );
    }

    // Derived key must be valid hexadecimal
    if(!isValidHex(derivedKey)){
        throw new InvalidHashError(
            'Hash contains an invalid derived key'
        );
    }

    // keyLength is measured in bytes.
    // Each byte is represented by 2 hex characters.
    if(derivedKey.length !== keyLength * 2){
        throw new InvalidHashError(
            'Derived key length does not match keyLength'
        );
    }
}