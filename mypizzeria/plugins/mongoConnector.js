const fastifyPlugin = require('fastify-plugin')
const connectMongo = require("../models/create_connection")

async function dbConnector (fastify, options, done) {
    connection = await connectMongo()
    fastify.decorate('mongoose', connection)
    done()
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector, {name:'mongoConnector'})