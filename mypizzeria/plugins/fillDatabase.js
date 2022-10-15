const fastifyPlugin = require('fastify-plugin')
const User = require('../models/User')


async function fillDatabase (fastify, options, done) {
    let users = await User.find({});
    const needs_filling = users.length === 0
    if (!needs_filling){
        done();
        return;
    }
    users = [User({username: 'test_user', password: 'password'})]
    await User.create(users)
    done()
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(fillDatabase, {name:'fillDatabase', dependencies:['mongoConnector']})