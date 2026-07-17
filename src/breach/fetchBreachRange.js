import BreachCheckError from '../errors/BreachCheckError.js';

const BREACH_API_URL = 'https://api.pwnedpasswords.com/range';

const DEFAULT_TIMEOUT = 5000;

export async function fetchBreachRange(prefix) {
  if (typeof prefix !== 'string' || !/^[0-9A-F]{5}$/.test(prefix)) {
    throw new BreachCheckError('Invalid breach fingerprint prefix');
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(`${BREACH_API_URL}/${prefix}`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Add-Padding': 'true',
      },
    });

    if (!response.ok) {
      throw new BreachCheckError(`Breach service returned status ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    if (error instanceof BreachCheckError) {
      throw error;
    }

    if (error?.name === 'AbortError') {
      throw new BreachCheckError('Breach check request timed out');
    }

    throw new BreachCheckError('Breach service is unavailable');
  } finally {
    clearTimeout(timeout);
  }
}
