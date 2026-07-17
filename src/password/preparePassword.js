import { normalizePassword } from "./normalizePassword.js";
import { validatePassword } from "../validators/validatePassword.js";

export function preparePassword(password) {
  const normalizedPassword = normalizePassword(password);

  validatePassword(normalizedPassword);

  return normalizedPassword;
}
