# Changelog

All notable changes to IronPass will be documented in this file.

## [0.2.0]

### Added

- Added `needsRehash()` to detect password hashes using outdated security parameters.
- Added `verifyAndRehash()` to verify passwords and upgrade outdated hashes.
- Added `checkPasswordBreach()` for privacy-preserving compromised-password detection.
- Added breach lookup using partial SHA-1 fingerprint range queries.
- Added breach lookup timeout and network error handling.
- Added `BreachCheckError`.
- Added configurable PBKDF2 hashing options.
- Added password normalization support.
- Added strict password, salt, hash, and option validation.
- Added malformed-input and security-focused test suites.
- Added npm consumer smoke testing.
- Added GitHub Actions CI across supported Node.js versions.

### Security

- Added timing-safe password hash comparison.
- Added PBKDF2 iteration boundaries.
- Added key-length boundaries.
- Added maximum password-length protection.
- Added random-byte allocation limits.
- Added strict encoded-hash validation.
- Added protection against malformed and resource-intensive hash parameters.
- Added validation of external breach-service responses.
- Added timeout handling for breach-service requests.
- Added padded breach range requests for improved privacy.

### Testing

- 150+ automated tests.
- 96%+ statement and line coverage.
- 100% function coverage.
- 100% coverage for the breach integration module.
- Verified packed npm package through an independent consumer smoke test.

### Documentation

- Expanded README with the complete public API.
- Added documentation for breached-password detection.
- Added privacy and security considerations.
