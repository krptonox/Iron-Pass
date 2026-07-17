class BreachCheckError extends Error {
  constructor(message = 'Unable to check password breach status') {
    super(message);
    this.name = 'BreachCheckError';
  }
}

export default BreachCheckError;
