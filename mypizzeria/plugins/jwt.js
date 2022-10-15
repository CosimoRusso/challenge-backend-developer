const fastifyPlugin = require('fastify-plugin')

async function register_jwt(fastify, options, done){
    fastify.register(require('@fastify/jwt'), {
        secret: 'thisshouldbeinadotenvfileLoL'
    });

    fastify.addHook("onRequest", async (request, reply) => {
        try {
            if (request.context.config.url !== '/login') {
                await request.jwtVerify()
            }
        } catch (err) {
            reply.send(err)
        }
    })

    done()
}



module.exports = fastifyPlugin(register_jwt, {name:'register_jwt'})