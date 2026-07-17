import { describe, it, expect } from 'vitest';

import { hash } from '../../src/core/hash.core.js';
import { verifyPassword } from '../../src/core/verify.core.js';

import InvalidHashError from '../../src/errors/InvalidHashError.js';

import InvalidPasswordError from '../../src/errors/InvalidPasswordError.js';

import { MAX_PASSWORD_LENGTH } from '../../src/constants/defaults.js';

describe('IronPass Verification Security', () => {
  it('should accept password at maximum length', async () => {
    const password = 'a'.repeat(MAX_PASSWORD_LENGTH);

    const hashedPassword = await hash(password);

    expect(await verifyPassword(password, hashedPassword)).toBe(true);
  });

  it('should reject password above maximum length when hashing', async () => {
    const password = 'a'.repeat(MAX_PASSWORD_LENGTH + 1);

    await expect(hash(password)).rejects.toThrow(InvalidPasswordError);
  });

  it('should reject password above maximum length when verifying', async () => {
    const hashedPassword = await hash('IronPass@123');

    const oversizedPassword = 'a'.repeat(MAX_PASSWORD_LENGTH + 1);

    await expect(verifyPassword(oversizedPassword, hashedPassword)).rejects.toThrow(
      InvalidPasswordError
    );
  });

  it('should verify the correct password', async () => {
    const password = 'IronPass@123';

    const hashedPassword = await hash(password);

    const result = await verifyPassword(password, hashedPassword);

    expect(result).toBe(true);
  });

  it('should reject an incorrect password', async () => {
    const hashedPassword = await hash('CorrectPassword123');

    const result = await verifyPassword('WrongPassword123', hashedPassword);

    expect(result).toBe(false);
  });

  it('should verify canonically equivalent Unicode passwords', async () => {
    const composed = '\u00E9';
    const decomposed = 'e\u0301';

    const hashedPassword = await hash(composed);

    const result = await verifyPassword(decomposed, hashedPassword);

    expect(result).toBe(true);
  });

  it('should reject an empty stored hash', async () => {
    await expect(verifyPassword('password', '')).rejects.toThrow(InvalidHashError);
  });

  it('should reject a hash with missing fields', async () => {
    const malformedHash = 'v1$pbkdf2$sha256';

    await expect(verifyPassword('password', malformedHash)).rejects.toThrow(InvalidHashError);
  });

  it('should reject a hash with extra fields', async () => {
    const malformedHash = 'v1$pbkdf2$sha256$300000$32$aabb$ccdd$EXTRA';

    await expect(verifyPassword('password', malformedHash)).rejects.toThrow(InvalidHashError);
  });

  it('should reject an unsupported hash version', async () => {
    const malformedHash = 'v999$pbkdf2$sha256$300000$32$aabb$ccdd';

    await expect(verifyPassword('password', malformedHash)).rejects.toThrow(InvalidHashError);
  });

  it('should reject an unsupported algorithm', async () => {
    const malformedHash = 'v1$unknown$sha256$300000$32$aabb$ccdd';

    await expect(verifyPassword('password', malformedHash)).rejects.toThrow(InvalidHashError);
  });

  it('should reject invalid salt hex', async () => {
    const malformedHash = 'v1$pbkdf2$sha256$300000$32$NOTHEX$ccdd';

    await expect(verifyPassword('password', malformedHash)).rejects.toThrow(InvalidHashError);
  });

  it('should reject invalid derived-key hex', async () => {
    const malformedHash = 'v1$pbkdf2$sha256$300000$32$aabb$NOTHEX';

    await expect(verifyPassword('password', malformedHash)).rejects.toThrow(InvalidHashError);
  });

  it('should reject excessive PBKDF2 iterations', async () => {
    const malformedHash = 'v1$pbkdf2$sha256$999999999$32$aabb$ccdd';

    await expect(verifyPassword('password', malformedHash)).rejects.toThrow(InvalidHashError);
  });

  it('should reject excessive key length', async () => {
    const malformedHash = 'v1$pbkdf2$sha256$300000$999999$aabb$ccdd';

    await expect(verifyPassword('password', malformedHash)).rejects.toThrow(InvalidHashError);
  });
});
