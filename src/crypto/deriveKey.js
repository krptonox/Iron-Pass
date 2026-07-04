import { DEFAULT_ITERATIONS, DEFAULT_KEY_LENGTH,DEFAULT_DIGEST } from '../constants/defaults.js';
import crypto from 'node:crypto';

export function deriveKey(password, salt, options = {
}){

    const {
    iterations = DEFAULT_ITERATIONS,
    keyLength = DEFAULT_KEY_LENGTH,
    digest = DEFAULT_DIGEST,
    } = options;

  return new Promise((resolve, reject) => {
      crypto.pbkdf2(password,salt,iterations,keyLength,digest,(error, derivedKey)=>{
        if(error){
            reject(error);
            return;
        }

        resolve(derivedKey);
      })
  })
}