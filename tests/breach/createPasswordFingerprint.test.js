import { describe, it, expect } from 'vitest';

import { createPasswordFingerprint } from '../../src/breach/createPasswordFingerprint.js';

import InvalidPasswordError from '../../src/errors/InvalidPasswordError.js';

describe('createPasswordFingerprint', () => {
  it('should create a 5-character prefix', () => {
    const result = createPasswordFingerprint('IronPass@123');

    expect(result.prefix).toHaveLength(5);
  });

  it('should create a 35-character suffix', () => {
    const result = createPasswordFingerprint('IronPass@123');

    expect(result.suffix).toHaveLength(35);
  });

  it('should return uppercase hexadecimal values', () => {
    const result = createPasswordFingerprint('IronPass@123');

    expect(result.prefix).toMatch(/^[0-9A-F]+$/);

    expect(result.suffix).toMatch(/^[0-9A-F]+$/);
  });

  it('should produce the same fingerprint for the same password', () => {
    const first = createPasswordFingerprint('IronPass@123');

    const second = createPasswordFingerprint('IronPass@123');

    expect(first).toEqual(second);
  });

  it('should support canonically equivalent Unicode passwords', () => {
    const composed = '\u00E9';

    const decomposed = 'e\u0301';

    expect(createPasswordFingerprint(composed)).toEqual(createPasswordFingerprint(decomposed));
  });

  it('should reject an empty password', () => {
    expect(() => createPasswordFingerprint('')).toThrow(InvalidPasswordError);
  });

  it('should reject a non-string password', () => {
    expect(() => createPasswordFingerprint(123)).toThrow(InvalidPasswordError);
  });
});
