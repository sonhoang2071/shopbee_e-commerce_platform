const Sequelize = require("sequelize");

const sequelize = require("../databases");

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
});

module.exports = Product;
