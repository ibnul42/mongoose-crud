const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

// express app initialization
const app = express();
dotenv.config()
app.use(express.json());

// database connection with mongoose
mongoose.connect('mongodb://localhost/todos')
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));

// application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).json({error: err})
};

app.use(errorHandler);

// app get request
app.get('/', (req, res) => {
    res.send('Hello!');
})

app.listen(3000, () => {
    console.log(`App is listening on 3000`);
})