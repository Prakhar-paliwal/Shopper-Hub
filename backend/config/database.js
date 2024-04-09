const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.mongodb_URI)
    .then(() => console.log("Database Connection is successful"))
    .catch((error) => {
        console.log("Error in Establishing Connection");
        console.log(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;