# IronPass 🔐

Modern password hashing library for Node.js built on PBKDF2.

## Features

- Secure PBKDF2 hashing
- Configurable iterations
- Salted password hashing
- Structured encoded output

## Installation

npm install ironpass

## Usage

import { hash } from 'ironpass';

const hashed = await hash('password123');


import { verifyPassword } from 'ironpass';

const verifiedPassword = await verifyPassword('password123',Hashed Password);