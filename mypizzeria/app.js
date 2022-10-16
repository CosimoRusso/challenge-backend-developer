'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const errorCodes = require('fastify').errorCodes

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.setErrorHandler(function (error, request, reply) {
    if (!error.statusCode || error instanceof errorCodes.FST_ERR_BAD_STATUS_CODE) {
      // Log error
      this.log.error(error)
      // Send error response
      reply.status(500).send({ ok: false })
    }else{
      reply.status(error.statusCode).send({ok: false, message: error.message})
    }

  })
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
