import { createPasswordFingerprint } from '../breach/createPasswordFingerprint.js';
import { fetchBreachRange } from '../breach/fetchBreachRange.js';

export async function checkPasswordBreach(password) {
  const { prefix, suffix } = createPasswordFingerprint(password);

  const response = await fetchBreachRange(prefix);

  const lines = response.split(/\r?\n/);

  for (const line of lines) {
    const [candidateSuffix, count] = line.trim().split(':');

    if (candidateSuffix === suffix) {
      return {
        breached: true,
        count: Number(count),
      };
    }
  }

  return {
    breached: false,
    count: 0,
  };
}
