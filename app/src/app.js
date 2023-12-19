require("dotenv").config();
const express = require("express");
const morgan = require('morgan');
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const db = require("./databases");

//middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
//init  database
const Shop = require("./models/shop.model");
db.sync()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
//routes

app.use("/", (req, res) => {
    res.send("hello from server :))");
});

module.exports = app;
