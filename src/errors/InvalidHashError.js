class InvalidHashError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidHashError';
  }
}

export default InvalidHashError;
