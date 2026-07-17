import { describe, it, expect } from 'vitest';

import {
  hash,
  verifyPassword,
  needsRehash,
  InvalidHashError,
  InvalidPasswordError,
  InvalidOptionsError,
} from '../src/index.js';

describe('IronPass Public API', () => {
  it('should export needsRehash()', () => {
    expect(typeof needsRehash).toBe('function');
  });

  it('should export hash()', () => {
    expect(typeof hash).toBe('function');
  });

  it('should export verifyPassword()', () => {
    expect(typeof verifyPassword).toBe('function');
  });

  it('should export InvalidHashError', () => {
    expect(typeof InvalidHashError).toBe('function');
  });

  it('should export InvalidPasswordError', () => {
    expect(typeof InvalidPasswordError).toBe('function');
  });

  it('should export InvalidOptionsError', () => {
    expect(typeof InvalidOptionsError).toBe('function');
  });
});
