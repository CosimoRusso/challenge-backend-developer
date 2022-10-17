'use strict'

const { test } = require('tap')
const paginate = require("../utils/paginator");
const tap = require("tap");


test('paginate with normal values', async (t) => {
    const req = {query: {skip: 0, limit: 5}}
    const res = paginate(req)
    tap.same(res, {skip:0, limit: 5})
})

test('paginate returns default values', async (t) => {
    const req = {query: {}}
    const res = paginate(req)
    tap.same(res, {skip:0, limit: 5})
})

test('paginate with limit too big shrinks it', async (t) => {
    const req = {query: {skip: 2, limit: 50}}
    const res = paginate(req)
    tap.same(res, {skip:2, limit: 5})
})