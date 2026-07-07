import { describe, it, expect } from 'vitest';

import { hash} from '../src/core/hash.core.js';

import { verifyPassword } from '../src/core/verify.core.js';

describe('verifyPassword()', () => {
  it('should return true for the correct password', async () => {
    const password = 'myPassword123';

    const hashedPassword = await hash(password);

    const result = await verifyPassword(password, hashedPassword);

    expect(result).toBe(true);
  });

  it('should return false for an incorrect password', async () => {
    const password = 'myPassword123';

    const hashedPassword = await hash(password);

    const result = await verifyPassword('wrongPassword', hashedPassword);

    expect(result).toBe(false);
  });
});