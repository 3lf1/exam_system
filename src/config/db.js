const mongoose = require('mongoose');
const { mongoDbSecret } = require('./env');

const connectDB = async() => {
    try{
        await mongoose.connect(mongoDbSecret);
        console.log("MongoDB conncected successfully");
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;