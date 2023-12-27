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
const Brand = require("./models/brand.model");
const Product = require("./models/product.model");
const Category = require("./models/category.model");
const BrandCategory = require("./models/brand_category.model");
const VariantProduct = require("./models/variant_product.model");
const Attribute = require("./models/attribute.model");
const Value = require("./models/value.model");
const CategoryValue = require("./models/category_value.model");
const ProductValue = require("./models/product_value.model");
const VariantProductValue = require("./models/variant_product_value.model");

PersonalToken.belongsTo(Shop);
UsedRefreshToken.belongsTo(Shop);
Product.belongsTo(Shop);
Product.belongsTo(Brand);
Product.belongsTo(Category);
Category.belongsToMany(Brand, { through: BrandCategory });
Brand.belongsToMany(Category, { through: BrandCategory });
VariantProduct.belongsTo(Product);
Value.belongsTo(Attribute);
Category.belongsToMany(Value, { through: CategoryValue });
Value.belongsToMany(Category, { through: CategoryValue });
Product.belongsToMany(Value, { through: ProductValue });
Value.belongsToMany(Product, { through: ProductValue });
VariantProduct.belongsToMany(Value, { through: VariantProductValue });
Value.belongsToMany(VariantProduct, { through: VariantProductValue });

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
