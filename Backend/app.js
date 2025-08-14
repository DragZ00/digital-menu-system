require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const app = express();

const PORT = config.PORT; 
connectDB();

app.get('/', (req, res) => {
  res.json({message : "Hello from server!"});
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });