function Error(statusCode, message){
    this.statusCode = statusCode || 500
    this.message = message || "error"
}

function BadRequestError(){
    return new Error(400, "Bad Request")
}

function UnauthorizedError(){
    return new Error(401, "Unauthorized")
}

module.exports = {BadRequestError, UnauthorizedError}