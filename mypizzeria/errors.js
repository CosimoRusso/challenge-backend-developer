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

class NotFoundError extends APIError{
    constructor(message) {
        super(404, message || "Not Found");
    }
}

module.exports = {BadRequestError, UnauthorizedError, NotFoundError}