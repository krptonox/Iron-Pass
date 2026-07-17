import { createPasswordFingerprint } from '../breach/createPasswordFingerprint.js';
import { fetchBreachRange } from '../breach/fetchBreachRange.js';

import BreachCheckError from '../errors/BreachCheckError.js';

export async function checkPasswordBreach(password) {
  const { prefix, suffix } = createPasswordFingerprint(password);

  const response = await fetchBreachRange(prefix);

  if (typeof response !== 'string') {
    throw new BreachCheckError('Invalid response from breach service');
  }

  const lines = response.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.length === 0) {
      continue;
    }

    const parts = trimmedLine.split(':');

    if (parts.length !== 2) {
      continue;
    }

    const [candidateSuffix, countValue] = parts;

    if (!/^[0-9A-F]{35}$/.test(candidateSuffix)) {
      continue;
    }

    if (!/^\d+$/.test(countValue)) {
      continue;
    }

    const count = Number(countValue);

    if (!Number.isSafeInteger(count) || count < 0) {
      continue;
    }

    if (candidateSuffix === suffix) {
      return {
        breached: true,
        count,
      };
    }
  }

  return {
    breached: false,
    count: 0,
  };
}
