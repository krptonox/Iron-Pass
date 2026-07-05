# IronPass Architecture

IronPass is a modular password hashing library built on PBKDF2.

## Flow

Password → normalize → validate → salt → deriveKey → encodeHash → store

## Design Principles

- Separation of concerns
- Cryptographic safety
- Stateless functions
- Deterministic verification design
