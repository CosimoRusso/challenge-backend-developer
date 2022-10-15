const Order = require("../models/Order");


module.exports = async function(fastify, opts){
    fastify.get('/orders/all', async function (request, reply) {
        const user = request.user;
        const limit = Math.min(request.query.limit || 5, 5);
        const skip = request.query.skip || 0;

        const orders = await Order.find({user}, {}, {skip, limit})
        const total = await Order.count()

        return {
            count: total,
            results: orders
        }
    })
}