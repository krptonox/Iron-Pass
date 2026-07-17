// src/index.js

export { hash } from './core/hash.core.js';

export { verifyPassword } from './core/verify.core.js';

export { needsRehash } from './core/needsRehash.core.js';

export { verifyAndRehash } from './core/verifyAndRehash.core.js';

export { checkPasswordBreach } from './core/checkPasswordBreach.core.js';

export { default as InvalidHashError } from './errors/InvalidHashError.js';

export { default as InvalidPasswordError } from './errors/InvalidPasswordError.js';

export { default as InvalidOptionsError } from './errors/InvalidOptionsError.js';

export { default as BreachCheckError } from './errors/BreachCheckError.js';
