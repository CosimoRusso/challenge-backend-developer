function Error(statusCode, message){
    this.statusCode = statusCode || 500
    this.message = message || "error"
}

function BadRequestError(){
    return new Error(400, "Bad Request")
}

module.exports = {BadRequestError}