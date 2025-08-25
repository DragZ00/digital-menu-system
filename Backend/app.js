require('dotenv').config();
const config = require('./config/config');
const express = require('express');
const connectDB = require('./config/database');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const createHttpError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const dishRoute = require("./routes/dishRoute");
const categoryRoute = require("./routes/categoryRoute");

const PORT = config.PORT; 
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
} ));

app.get('/', (req, res) => {
  res.json({message : "sunucudan selamlar!"});
});

app.use("/api/user", require('./routes/userRoute'));
app.use("/api/order", require('./routes/orderRoute'));
app.use("/api/table", require('./routes/tableRoute'));
app.use("/api/dish", dishRoute);
app.use("/api/category", categoryRoute);

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

    const orderRoute = require("./routes/orderRoute");
app.use("/api/order", orderRoute);