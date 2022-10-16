const Product = require("../models/Product");
const {productsResponseSchema} = require('../schemas/products_schema')

module.exports = async function(fastify, opts){
    const options = {schema: productsResponseSchema}

    fastify.get('/products/all', options, async function (request, reply) {
        const limit = Math.min(request.query.limit || 5, 5);
        const skip = request.query.skip || 0;

        const products = await Product.find({}, {}, {skip, limit})
        const total = await Product.count()

        return {
            count: total,
            results: products
        }
    })
}