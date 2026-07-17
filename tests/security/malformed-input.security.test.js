import { describe, it, expect } from 'vitest';

import { hash } from '../../src/core/hash.core.js';
import { verifyPassword } from '../../src/core/verify.core.js';

import InvalidHashError from '../../src/errors/InvalidHashError.js';
import InvalidPasswordError from '../../src/errors/InvalidPasswordError.js';


describe('IronPass Malformed Input Security', () => {

    describe('Malformed stored hashes', () => {

        it.each([
            '',
            ' ',
            '$',
            '$$$$$$',
            'random-string',
            'v1',
            'v1$pbkdf2',
            'v1$pbkdf2$sha256',
            'v1$pbkdf2$sha256$300000$32',
            'v1$pbkdf2$sha256$300000$32$salt',
            'v1$pbkdf2$sha256$300000$32$salt$key$extra'
        ])(
            'should safely reject malformed hash: %s',
            async (malformedHash) => {

                await expect(
                    verifyPassword(
                        'IronPass@123',
                        malformedHash
                    )
                ).rejects.toThrow(InvalidHashError);
            }
        );


        it.each([
            null,
            undefined,
            123,
            true,
            {},
            [],
            Buffer.from('hash')
        ])(
            'should reject non-string stored hash',
            async (malformedHash) => {

                await expect(
                    verifyPassword(
                        'IronPass@123',
                        malformedHash
                    )
                ).rejects.toThrow(InvalidHashError);
            }
        );

    });


    describe('Malformed hash metadata', () => {

        it.each([
            'NaN',
            'Infinity',
            '-1',
            '0',
            '1.5',
            'abc'
        ])(
            'should reject invalid iterations: %s',
            async (iterations) => {

                const malformedHash =
                    `v1$pbkdf2$sha256$${iterations}$32$aabb$${'aa'.repeat(32)}`;

                await expect(
                    verifyPassword(
                        'IronPass@123',
                        malformedHash
                    )
                ).rejects.toThrow(InvalidHashError);
            }
        );


        it.each([
            'NaN',
            'Infinity',
            '-1',
            '0',
            '1.5',
            'abc'
        ])(
            'should reject invalid keyLength: %s',
            async (keyLength) => {

                const malformedHash =
                    `v1$pbkdf2$sha256$300000$${keyLength}$aabb$${'aa'.repeat(32)}`;

                await expect(
                    verifyPassword(
                        'IronPass@123',
                        malformedHash
                    )
                ).rejects.toThrow(InvalidHashError);
            }
        );

    });


    describe('Malformed password inputs', () => {

        it.each([
            null,
            undefined,
            123,
            true,
            {},
            [],
            Buffer.from('password')
        ])(
            'should reject non-string password',
            async (password) => {

                await expect(
                    hash(password)
                ).rejects.toThrow(
                    InvalidPasswordError
                );
            }
        );


        it('should reject an empty password', async () => {

            await expect(
                hash('')
            ).rejects.toThrow(
                InvalidPasswordError
            );
        });

    });


    describe('Tampered valid hashes', () => {

        it('should reject a truncated valid hash', async () => {

            const hashedPassword = await hash(
                'IronPass@123'
            );

            const truncatedHash =
                hashedPassword.slice(0, -10);

            await expect(
                verifyPassword(
                    'IronPass@123',
                    truncatedHash
                )
            ).rejects.toThrow(
                InvalidHashError
            );
        });


        it('should reject a hash with injected separators', async () => {

            const hashedPassword = await hash(
                'IronPass@123'
            );

            const tamperedHash =
                hashedPassword + '$injected';

            await expect(
                verifyPassword(
                    'IronPass@123',
                    tamperedHash
                )
            ).rejects.toThrow(
                InvalidHashError
            );
        });

    });

});