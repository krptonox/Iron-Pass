class InvalidNormalizationFormError extends Error {
  constructor(message = 'Invalid normalization form. Must be one of NFC, NFD, NFKC, or NFKD.') {
    super(message);
    this.name = 'InvalidNormalizationFormError';
  }
}

export { InvalidNormalizationFormError };
