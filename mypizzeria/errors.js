class APIError extends Error{
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode || 500
        this.message = message || "error"
    }

}

class BadRequestError extends APIError{
    constructor(message) {
        super(400, message || "Bad Request");
    }
}

class UnauthorizedError extends APIError{
    constructor(message) {
        super(401, message || "Unauthorized");
    }
}

module.exports = {BadRequestError, UnauthorizedError}