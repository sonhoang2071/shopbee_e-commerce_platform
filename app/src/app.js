require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();
const db = require("./databases");

//middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
//init  database
const Shop = require("./models/shop.model");
const PersonalToken = require("./models/personal_token.model");

db.sync()
    .then((result) => {
        console.log("Database is connected");
    })
    .catch((err) => {
        console.log(err);
    });
//routes

app.use("/", require("./routes"));

module.exports = app;
