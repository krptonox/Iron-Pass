export function decodeHash(hashedPassword) {

    if(!hashedPassword || typeof hashedPassword !== 'string') {
        throw new Error('Invalid hashed password');
    }

    const [version, algorithm, digest, iterations, keyLength, salt, derivedKey] = hashedPassword.split('$');

return {
    version,
    algorithm,
    digest,
    iterations: Number(iterations),
    keyLength: Number(keyLength),
    salt,
    derivedKey
};
}