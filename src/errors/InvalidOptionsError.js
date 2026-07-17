class InvalidOptionsError extends Error {
    constructor(
        message = 'Invalid options provided. Please check the options and try again.'
    ){
        super(message);
        this.name = 'InvalidOptionsError';
    }
}

export default InvalidOptionsError;