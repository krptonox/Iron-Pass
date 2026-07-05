import { InvalidNormalizationFormError } from '../errors/InvalidNormalizationFormError.js';


const VALID_NORMALIZATION_FORMS = ['NFC','NFD','NFKC','NFKD'];


export function normalizePassword(password,form = 'NFC'){
    if(typeof password !== 'string'){
        throw new TypeError('Password must be a string.');
    }

    if(!VALID_NORMALIZATION_FORMS.includes(form)){
        throw new InvalidNormalizationFormError('Invalid normalization form');
    }

    const normalizedPassword = password.normalize(form);

    return normalizedPassword;
}