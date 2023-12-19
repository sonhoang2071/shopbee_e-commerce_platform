require("dotenv").config();
const express = require("express");

const app = express();

//init  database

//middlewares

//routes

app.use("/", (req, res) => {
    res.send("hello from server :))");
});

module.exports = app;
