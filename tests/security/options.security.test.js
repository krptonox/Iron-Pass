import { describe, it, expect } from 'vitest';

import { hash } from '../../src/core/hash.core.js';
import { verifyPassword } from '../../src/core/verify.core.js';

import InvalidOptionsError from '../../src/errors/InvalidOptionsError.js';

import {
  MIN_ITERATIONS,
  MAX_ITERATIONS,
  MIN_KEY_LENGTH,
  MAX_KEY_LENGTH,
} from '../../src/constants/defaults.js';

describe('IronPass Options Security', () => {
  it('should accept MIN_ITERATIONS', async () => {
    const hashedPassword = await hash('IronPass@123', {
      iterations: MIN_ITERATIONS,
    });

    expect(typeof hashedPassword).toBe('string');
  });

  it('should accept MAX_ITERATIONS', async () => {
    const hashedPassword = await hash('IronPass@123', {
      iterations: MAX_ITERATIONS,
    });

    expect(typeof hashedPassword).toBe('string');
  });

  it('should accept MIN_KEY_LENGTH', async () => {
    const hashedPassword = await hash('IronPass@123', {
      keyLength: MIN_KEY_LENGTH,
    });

    expect(typeof hashedPassword).toBe('string');
  });

  it('should accept MAX_KEY_LENGTH', async () => {
    const hashedPassword = await hash('IronPass@123', {
      keyLength: MAX_KEY_LENGTH,
    });

    expect(typeof hashedPassword).toBe('string');
  });

  it('should hash and verify with valid custom options', async () => {
    const password = 'IronPass@123';

    const hashedPassword = await hash(password, {
      iterations: MIN_ITERATIONS,
      keyLength: MIN_KEY_LENGTH,
      digest: 'sha512',
    });

    const result = await verifyPassword(password, hashedPassword);

    expect(result).toBe(true);
  });

  it('should reject iterations just below the minimum', async () => {
    await expect(
      hash('IronPass@123', {
        iterations: MIN_ITERATIONS - 1,
      })
    ).rejects.toThrow(InvalidOptionsError);
  });

  it('should reject iterations just above the maximum', async () => {
    await expect(
      hash('IronPass@123', {
        iterations: MAX_ITERATIONS + 1,
      })
    ).rejects.toThrow(InvalidOptionsError);
  });

  it('should reject non-integer iterations', async () => {
    await expect(
      hash('IronPass@123', {
        iterations: 300000.5,
      })
    ).rejects.toThrow(InvalidOptionsError);
  });

  it('should reject keyLength just below the minimum', async () => {
    await expect(
      hash('IronPass@123', {
        keyLength: MIN_KEY_LENGTH - 1,
      })
    ).rejects.toThrow(InvalidOptionsError);
  });

  it('should reject keyLength just above the maximum', async () => {
    await expect(
      hash('IronPass@123', {
        keyLength: MAX_KEY_LENGTH + 1,
      })
    ).rejects.toThrow(InvalidOptionsError);
  });

  it('should reject an unsupported digest', async () => {
    await expect(
      hash('IronPass@123', {
        digest: 'md5',
      })
    ).rejects.toThrow(InvalidOptionsError);
  });

  it('should reject an unknown option', async () => {
    await expect(
      hash('IronPass@123', {
        unknownOption: true,
      })
    ).rejects.toThrow(InvalidOptionsError);
  });
});
