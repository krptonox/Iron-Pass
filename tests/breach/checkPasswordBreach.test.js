import { beforeEach, describe, expect, it, vi } from 'vitest';

import { checkPasswordBreach } from '../../src/core/checkPasswordBreach.core.js';

import { createPasswordFingerprint } from '../../src/breach/createPasswordFingerprint.js';

import { fetchBreachRange } from '../../src/breach/fetchBreachRange.js';

vi.mock('../../src/breach/fetchBreachRange.js', () => ({
  fetchBreachRange: vi.fn(),
}));

describe('checkPasswordBreach', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should detect a breached password', async () => {
    const password = 'IronPass@123';

    const { suffix } = createPasswordFingerprint(password);

    fetchBreachRange.mockResolvedValue(
      [
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:10',
        `${suffix}:8473`,
        'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB:20',
      ].join('\r\n')
    );

    const result = await checkPasswordBreach(password);

    expect(result).toEqual({
      breached: true,
      count: 8473,
    });
  });

  it('should return false when password is not found', async () => {
    fetchBreachRange.mockResolvedValue(
      ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:10', 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB:20'].join(
        '\r\n'
      )
    );

    const result = await checkPasswordBreach('IronPass@123');

    expect(result).toEqual({
      breached: false,
      count: 0,
    });
  });

  it('should perform the lookup using only the fingerprint prefix', async () => {
    const password = 'IronPass@123';

    const { prefix } = createPasswordFingerprint(password);

    fetchBreachRange.mockResolvedValue('');

    await checkPasswordBreach(password);

    expect(fetchBreachRange).toHaveBeenCalledWith(prefix);
  });

  it('should correctly handle Unicode-equivalent passwords', async () => {
    const composed = '\u00E9';
    const decomposed = 'e\u0301';

    const { suffix } = createPasswordFingerprint(composed);

    fetchBreachRange.mockResolvedValue(`${suffix}:500`);

    const result = await checkPasswordBreach(decomposed);

    expect(result).toEqual({
      breached: true,
      count: 500,
    });
  });
});
