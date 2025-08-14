require("dotenv").config();

const config = Object.freeze({
    PORT: process.env.PORT || 3000,
    databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase",
    nodeEnv : process.env.NODE_ENV || "development",
});
module.exports = config;