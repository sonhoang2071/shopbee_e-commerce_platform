const Sequelize = require("sequelize");

const sequelize = require("../databases");

const ProductValue = sequelize.define("product_value", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = ProductValue;
