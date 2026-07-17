class InvalidLengthError extends Error {
  constructor(message = 'Length must be a positive integer greater than 0.') {
    super(message);
    this.name = 'InvalidLengthError';
  }
}

export { InvalidLengthError };
