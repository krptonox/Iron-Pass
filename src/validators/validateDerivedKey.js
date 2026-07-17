export function validateDerivedKey(derivedKey) {
  if (!Buffer.isBuffer(derivedKey)) {
    throw new Error('Derived key must be a Buffer');
  }
}
