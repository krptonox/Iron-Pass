import { generateSalt } from "../src/crypto/generateSalt.js";

const salt = generateSalt(16);
console.log(salt)