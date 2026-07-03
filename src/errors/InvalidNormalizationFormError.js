class InvalidNormalizationFormError extends Error {
    constructor(message= "Invalid normalization form. Must be one of NFC, NFD, NFKC, or NFKD. or pass a String"){
        super(message);
        this.message = message;
    }
}

export { InvalidNormalizationFormError };