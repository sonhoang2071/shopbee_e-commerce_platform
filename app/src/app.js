require("dotenv").config();
const express = require("express");

const app = express();
const db = require("./databases");
//init  database
const Shop = require("./models/shop.model");
db.sync()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
//middlewares

//routes

app.use("/", (req, res) => {
    res.send("hello from server :))");
});

module.exports = app;
