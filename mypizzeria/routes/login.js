'use strict'

const User = require('../models/User')
const errorCodes = require('fastify').errorCodes
const {BadRequestError, UnauthorizedError} = require("../errors")

module.exports = async function (fastify, opts) {
    fastify.post('/login', async function (request, reply) {
        const user = await User.findOne({
            username: request.body.username,
        });
        if (!user){
            throw new UnauthorizedError("Wrong username")
        }
        const passwordMatches = await user.comparePassword(request.body.password)
        if (!passwordMatches){
            throw new UnauthorizedError("Wrong password")
        }
        const payload = {user_id: user._id}
        const token = fastify.jwt.sign({ payload })
        reply.status(201).send({ token })
    })
}