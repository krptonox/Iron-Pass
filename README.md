# IronPass 🔐

A modern password security toolkit for Node.js built on PBKDF2.

IronPass helps developers securely hash and verify passwords, detect outdated password hashes, upgrade them over time, and check whether passwords have appeared in known data breaches.

## Features

- 🔐 Secure password hashing using PBKDF2
- 🧂 Cryptographically secure random salts
- ⚙️ Configurable iterations, key length, and digest
- 🛡️ Security boundaries against excessive resource usage
- 🔍 Timing-safe password verification
- 🔄 Automatic hash upgrade support
- 📊 Detect outdated password hashing parameters
- 🚨 Breached password detection
- 🔒 Privacy-preserving breach lookups
- 🌐 Unicode password normalization
- ⚠️ Structured error handling
- 🧪 Extensive security and malformed-input testing

## Installation

```bash
npm install ironpass
```

## Requirements

IronPass requires Node.js 20 or newer.

```json
{
  "engines": {
    "node": ">=20"
  }
}
```

## Quick Start

```js
import { hash, verifyPassword } from 'ironpass';

const password = 'MySecurePassword123!';

// Hash a password
const hashedPassword = await hash(password);

console.log(hashedPassword);

// Verify the password
const isValid = await verifyPassword(password, hashedPassword);

console.log(isValid);
// true
```

---

# API

IronPass provides five main public functions:

```js
import { hash, verifyPassword, needsRehash, verifyAndRehash, checkPasswordBreach } from 'ironpass';
```

## `hash(password, options?)`

Creates a secure PBKDF2 password hash with a cryptographically secure random salt.

```js
import { hash } from 'ironpass';

const hashedPassword = await hash('MySecurePassword123!');
```

### Custom Options

```js
const hashedPassword = await hash('MySecurePassword123!', {
  iterations: 300000,
  keyLength: 32,
  digest: 'sha512',
});
```

Supported digests:

- `sha256`
- `sha512`

IronPass validates security and resource boundaries for configurable options.

---

## `verifyPassword(password, hashedPassword)`

Verifies a password against an IronPass hash.

```js
import { verifyPassword } from 'ironpass';

const isValid = await verifyPassword('MySecurePassword123!', hashedPassword);

if (isValid) {
  console.log('Password verified');
}
```

Password comparison uses Node.js timing-safe comparison to reduce timing-based information leakage.

---

## `needsRehash(hashedPassword)`

Checks whether an existing password hash uses outdated hashing parameters.

This is useful when IronPass security defaults change over time.

```js
import { needsRehash } from 'ironpass';

const shouldUpgrade = needsRehash(hashedPassword);

if (shouldUpgrade) {
  console.log('Password hash should be upgraded');
}
```

This allows applications to gradually migrate stored password hashes without forcing every user to reset their password.

---

## `verifyAndRehash(password, hashedPassword)`

Verifies a password and automatically creates an upgraded hash when the existing hash uses outdated parameters.

```js
import { verifyAndRehash } from 'ironpass';

const result = await verifyAndRehash(password, hashedPassword);

console.log(result);
```

Possible result when the hash is current:

```js
{
  valid: true,
  rehashed: false,
  hash: null
}
```

If the password is valid but the hash needs upgrading:

```js
{
  valid: true,
  rehashed: true,
  hash: 'v1$pbkdf2$...'
}
```

Your application can then replace the old stored hash with the new one.

---

# Breached Password Detection 🚨

IronPass can check whether a password appears in known compromised-password data.

```js
import { checkPasswordBreach } from 'ironpass';

const result = await checkPasswordBreach('user-password');

if (result.breached) {
  console.warn(`Warning: This password appears ${result.count} times in known breach data.`);
}
```

Example result:

```js
{
  breached: true,
  count: 1000
}
```

If no match is found:

```js
{
  breached: false,
  count: 0
}
```

## Privacy-Preserving Breach Lookup

IronPass does not intentionally send the plaintext password to the breach lookup service.

The lookup works by:

1. Normalizing and validating the password locally.
2. Creating a SHA-1 fingerprint locally.
3. Splitting the fingerprint into a 5-character prefix and a remaining suffix.
4. Sending only the 5-character prefix for a range lookup.
5. Receiving possible matching fingerprint suffixes.
6. Performing the final comparison locally.

The complete password and complete fingerprint are not intentionally transmitted as part of the lookup.

> SHA-1 is used only for compatibility with the breached-password lookup protocol. IronPass does not use SHA-1 for password storage. Password hashing uses PBKDF2.

The breach lookup also requests padded responses to improve privacy characteristics.

## Understanding Breach Results

A result of:

```js
{
  breached: true,
  count: 52372427
}
```

means the password was found in the checked compromised-password corpus.

The `count` represents the occurrence count reported by the breach-password service. It does not necessarily represent the number of distinct websites or individual data breaches containing the password.

A result of:

```js
{
  breached: false,
  count: 0
}
```

does not guarantee that the password is secure or has never been compromised. It means no matching password fingerprint was found in the checked dataset.

Applications should treat breach detection as one part of a broader password security policy.

IronPass returns the breach information and allows the application developer to decide whether to:

- Display a warning
- Ask the user to choose another password
- Reject known compromised passwords

IronPass does not automatically reject passwords based on breach status.

## Network Requirements

`checkPasswordBreach()` requires network access to perform the breach lookup.

If the external breach service is unavailable, returns an error, or the request times out, IronPass throws a `BreachCheckError`.

Applications should handle this possibility appropriately.

```js
try {
  const result = await checkPasswordBreach(password);

  if (result.breached) {
    console.warn('Please choose another password.');
  }
} catch (error) {
  console.error('Unable to check password breach status');
}
```

---

# Password Hash Lifecycle

IronPass is designed to help protect passwords throughout their lifecycle.

```text
User chooses password
        │
        ▼
checkPasswordBreach()
        │
        ▼
      hash()
        │
        ▼
Store password hash
        │
        ▼
User logs in
        │
        ▼
verifyPassword()
        │
        ▼
needsRehash()
        │
        ▼
verifyAndRehash()
        │
        ▼
Upgrade outdated hash
```

This allows applications to improve password security over time as recommended hashing parameters evolve.

---

# Security

IronPass includes several security protections:

- PBKDF2-based password hashing
- Cryptographically secure random salts
- Timing-safe derived-key comparison
- Password normalization
- Strict encoded-hash validation
- Iteration boundaries
- Key-length boundaries
- Password-length limits
- Random-byte allocation limits
- Malformed hash rejection
- Resource-exhaustion protections
- External breach-response validation
- Breach lookup timeout handling
- Network failure handling

## Important

IronPass helps developers implement password security, but application security also depends on proper authentication design, secure database storage, HTTPS, session management, rate limiting, and other security controls.

---

# Testing

IronPass includes automated unit, integration, security, boundary, malformed-input, and breach-detection tests.

Current test status:

```text
Test Files: 21 passed
Tests:      150 passed
```

Current coverage:

```text
Statements: 96.37%
Branches:   95.97%
Functions:  100%
Lines:      96.35%
```

The breach module currently has 100% statement, branch, function, and line coverage.

---

# License

MIT

---

Built with a focus on secure password handling for Node.js applications.
