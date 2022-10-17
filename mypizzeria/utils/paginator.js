function paginate(request){
    const limit = Math.min(request.query.limit || 5, 5);
    const skip = request.query.skip || 0;
    return {limit, skip}
}

module.exports = paginate