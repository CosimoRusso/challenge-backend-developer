const User = require('../models/User')
const Product = require('../models/Product')
const connectMongo = require("../models/create_connection");
const mongoose = require("mongoose")



async function fillDatabase () {
    await connectMongo()
    let users = await User.find({});
    const needs_filling = users.length === 0
    if (!needs_filling){
        return;
    }
    users = [User({username: 'test_user', password: 'password'})]
    await User.create(users)

    products = [
        Product({code: 'pizza_margherita', displayName: "Pizza Margherita", priceUnitEur: 5}),
        Product({code: 'coca_cola', displayName: "Coca Cola", priceUnitEur: 2})
    ]
    await Product.create(products)
    // await mongoose.connection.close()
}

fillDatabase().then(() => console.log("FILLED")).catch(console.log)