import { describe, it, expect } from 'vitest';
import { normalizePassword } from '../src/password/normalizePassword.js';

describe('normalizePassword()', () => {
  it('should normalize unicode passwords correctly', () => {
    const a = normalizePassword('testé');
    const b = normalizePassword('teste\u0301');

    expect(a).toBe(b);
  });
});
