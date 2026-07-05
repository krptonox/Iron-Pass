import InvalidOptionsError from '../errors/InvalidOptionsError.js';

export function validateOptions(options){
 //to check the options , are they valid or not 
 const VALID_KEYS = [
    'iterations',
    'keyLength',
    'digest'
];

 
    if (!options || typeof options !== 'object') {
    throw new InvalidOptionsError('Options must be an object');
    }
    
 for(const key of Object.keys(options)){

    if(!VALID_KEYS.includes(key)){
        throw new InvalidOptionsError(`Invalid option provided: ${key}`);
    }

    if(key === 'digest' && typeof options[key] !== 'string'){
        throw new InvalidOptionsError(`Invalid type for option ${key}. Expected a string.`);
    }

    if(key === 'iterations' && (options[key] <= 0 || !Number.isInteger(options[key]))){
        throw new InvalidOptionsError(`Invalid value for option ${key}. Must be a positive integer.`);
    }

    if(key === 'keyLength' && (options[key] <= 0 || !Number.isInteger(options[key]))){
        throw new InvalidOptionsError(`Invalid value for option ${key}. Must be a positive integer.`);
    }

    if(key === 'digest' && !['sha256', 'sha512'].includes(options[key])){
        throw new InvalidOptionsError(`Invalid value for option ${key}. Must be either 'sha256' or 'sha512'.`);
    }
    
 }
}