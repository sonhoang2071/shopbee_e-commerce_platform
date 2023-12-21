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
const UsedRefreshToken = require("./models/used_refresh_token");

db.sync()
    .then((result) => {
        console.log("Database is connected");
    })
    .catch((err) => {
        console.log(err);
    });
//routes

app.use("/", require("./routes"));

//handling errors
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || "Internal Server Error",
        stack: error.stack,
    });
});

module.exports = app;
