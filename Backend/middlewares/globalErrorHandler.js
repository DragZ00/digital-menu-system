const { config } = require("dotenv");

const globalErrorHandler = (err, req, res, next) => {
     const statusCode = err.statusCode || 500;

     return res.status(statusCode).json({
        status: statusCode,
        message: err.message,
        errorstack: config.NODE_ENV === "development" ? err.stack : ""
})
}
module.exports = globalErrorHandler;