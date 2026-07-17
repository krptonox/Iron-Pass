import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchBreachRange } from '../../src/breach/fetchBreachRange.js';

import BreachCheckError from '../../src/errors/BreachCheckError.js';

describe('fetchBreachRange', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should reject an invalid prefix', async () => {
    await expect(fetchBreachRange('ABC')).rejects.toThrow(BreachCheckError);
  });

  it('should reject a lowercase prefix', async () => {
    await expect(fetchBreachRange('abcde')).rejects.toThrow(BreachCheckError);
  });

  it('should reject a non-hex prefix', async () => {
    await expect(fetchBreachRange('ZZZZZ')).rejects.toThrow(BreachCheckError);
  });

  it('should reject a non-string prefix', async () => {
    await expect(fetchBreachRange(12345)).rejects.toThrow(BreachCheckError);
  });

  it('should return the breach range response', async () => {
    const mockResponse = [
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:10',
      'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB:20',
    ].join('\r\n');

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      text: async () => mockResponse,
    });

    const result = await fetchBreachRange('ABCDE');

    expect(result).toBe(mockResponse);
  });

  it('should send only the 5-character prefix in the URL', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      text: async () => '',
    });

    await fetchBreachRange('ABCDE');

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url] = fetchMock.mock.calls[0];

    expect(url).toContain('/ABCDE');
  });

  it('should request padded responses', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      text: async () => '',
    });

    await fetchBreachRange('ABCDE');

    const [, options] = fetchMock.mock.calls[0];

    expect(options.headers).toEqual({
      'Add-Padding': 'true',
    });
  });

  it('should reject unsuccessful API responses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchBreachRange('ABCDE')).rejects.toThrow(BreachCheckError);
  });

  it('should handle network failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network failure'));

    await expect(fetchBreachRange('ABCDE')).rejects.toThrow(BreachCheckError);
  });
});
