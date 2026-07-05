import InvalidPasswordError from "../errors/InvalidPasswordError.js";
import { MAX_PASSWORD_LENGTH } from "../constants/password.js";

export function validatePassword(password){
    if(typeof password !== 'string'){
        throw new InvalidPasswordError("Password must be a string.");
    }

    if(password === ""){
        throw new InvalidPasswordError("Password is required.");
    }

    if(password.length > MAX_PASSWORD_LENGTH){
        throw new InvalidPasswordError("Password is too long.");
    }

    return password;
}
