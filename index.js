require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoute = require('./route/auth');
const userRoute = require('./route/users');
const verifyToken = require("./middleware/verifyToken");
const eventRoute = require("./route/event");


const Port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI

// middleware
app.use(express.json());


app.use('/auth', authRoute );
app.use('/user', userRoute);
app.use('/users', userRoute);
app.use('/event', eventRoute);



mongoose
.connect(MONGO_URI)
.then(() => {
  console.log("Successfully connected to database");
})
.catch((error) => {
  console.log("database connection failed. exiting now...");
  console.error(error);
  process.exit(1);
});

app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
  });