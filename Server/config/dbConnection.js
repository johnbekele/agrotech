const mongoose = require('mongoose');

const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            connectTimeoutMS: 10000,

            maxPoolSize: 10,
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host} :${conn.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;