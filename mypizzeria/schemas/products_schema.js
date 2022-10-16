const productSchema = {
    type: 'object',
    properties: {
        code: {type: 'string'},
        displayName: {type: 'string'},
        priceUnitEur: {type: 'number'},
    },
}

const productListSchema = {
    type: "array",
    items: productSchema,
    minSize: 1
}

const paginatedProducts = {
    type: 'object',
    properties: {
        count: {type: 'integer'},
        results: productListSchema
    }
}

const productsResponseSchema = {
    response: {
        200: paginatedProducts
    }
}

module.exports = {productsResponseSchema};