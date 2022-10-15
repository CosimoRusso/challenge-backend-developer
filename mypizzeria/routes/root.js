'use strict'

const User = require('../models/User')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const users = await User.find()
    return users
  })
}
