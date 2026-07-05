# Security Model

IronPass uses PBKDF2 with configurable iterations.

## Security Features

- Salt prevents rainbow table attacks
- High iteration count slows brute-force attacks
- Derived key is not reversible
