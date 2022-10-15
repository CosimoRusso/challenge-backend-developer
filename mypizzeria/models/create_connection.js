const mongoose = require('mongoose');
const User = require('../models/User')

const connectMongo = async (test=false) => {
    const db_name = test ? 'mypizzeria_test' : 'mypizzeria'
    const connectionString = `mongodb://root:pass@localhost:27017/${db_name}?authSource=admin`
    const already_connected = mongoose.connection.readyState;
    let connection = null
    if (already_connected){
        connection = mongoose;
    }else{
        connection = await mongoose.connect(connectionString);
    }
    const models = [User]
    for (let model of models){
        await model.init()
    }
    return connection
}

module.exports = connectMongo