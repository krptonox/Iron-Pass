import {decodeHash} from '../src/crypto/decodeHash.js';

const decodedHash = decodeHash('v1$pbkdf2$sha256$100000$64$3dce24efc037de17cde430476301f204$bde640b7f14be8b6be927cfafa05f87558601a301df29f3aedf55bf0f4ed0c78c737f75ec48223871fd7a39151c21654a31017d9c46c90250bc42dd8df81abb0');

console.log(decodedHash);