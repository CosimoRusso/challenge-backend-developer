const fastifyPlugin = require('fastify-plugin')

async function register_jwt(fastify, options, done){
    fastify.register(require('@fastify/jwt'), {
        secret: 'thisshouldbeinadotenvfileLoL'
    })
    done()
}

module.exports = fastifyPlugin(register_jwt, {name:'register_jwt'})