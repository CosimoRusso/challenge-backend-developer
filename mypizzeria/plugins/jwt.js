const fastifyPlugin = require('fastify-plugin')
const {BadRequestError, UnauthorizedError} = require("../errors");
const User = require("../models/User");


async function register_jwt(fastify, options, done){
    fastify.register(require('@fastify/jwt'), {
        secret: 'thisShouldBeInDotEnvFileLoL'
    });

    fastify.addHook("onRequest", async (request, reply) => {
        if (request.context.config.url !== '/login') {
            try{
                await request.jwtVerify()
            }catch(e){
                throw new UnauthorizedError()
            }

            request.user_id = request.user.payload.user_id
        }
    })

    done()
}



module.exports = fastifyPlugin(register_jwt, {name:'register_jwt'})