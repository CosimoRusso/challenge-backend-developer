const Order = require("../models/Order");
const {paginatedOrdersSchema} = require("../schemas/orders_schema");


module.exports = async function(fastify, opts){
    const options = {
        schema: {
            response: {
                200: paginatedOrdersSchema
            }
        }
    }


    fastify.get('/orders/all', options, async function (request, reply) {
        const user_id = request.user_id;
        const limit = Math.min(request.query.limit || 5, 5);
        const skip = request.query.skip || 0;

        const orders = await Order.find({user: user_id}, {}, {skip, limit}).populate("products.product")
        const total = await Order.count()

        return {
            count: total,
            results: orders
        }
    })
}