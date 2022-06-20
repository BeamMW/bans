
export default class ApiError extends Error {
    public readonly name: string = "api-error";
    public readonly isOperational: boolean = true;

    public readonly shaderCode: any;

    constructor(shaderCode: any, message: string, isOperational: boolean) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.shaderCode = shaderCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }

    isOperationalError() {
        return this.isOperational
    }

}