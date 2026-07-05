class InvalidSaltError extends Error {
    constructor(message='Invalid salt provided'){
        super(message);
        this.name = message;
    }
}

export {InvalidSaltError};