const mongoose = require('mongoose')
const config = require('config')
const MONGO_URI = config.get('MONGO_URI')

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to MONGODB")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectMongoDB