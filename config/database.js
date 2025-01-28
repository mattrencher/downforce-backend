const mongoose = require('mongoose');

const { MONGO_URI } = process.env;
let conn = null;
exports.connect = async () => {
    // Connecting to the database
    if (conn == null) {
        conn = mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 3000
        }).then(() => mongoose).catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });

        await conn;
    }
    return conn;
};