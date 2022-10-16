'use strict'

const User = require('../models/User')
const errorCodes = require('fastify').errorCodes
const {BadRequestError} = require("../errors")

module.exports = async function (fastify, opts) {
    fastify.post('/login', async function (request, reply) {
        const user = await User.findOne({
            username: request.body.username,
        });
        if (!user){
            throw errorCodes.FST_ERR_NOT_FOUND()
        }
        const passwordMatches = await user.comparePassword(request.body.password)
        if (!passwordMatches){
            throw new BadRequestError()
        }
        const payload = {user_id: user._id}
        const token = fastify.jwt.sign({ payload })
        reply.status(201).send({ token })
    })
}