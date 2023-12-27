const Sequelize = require("sequelize");

const sequelize = require("../databases");

const VariantProduct = sequelize.define("variant_product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    price: Sequelize.INTEGER,
    amount: Sequelize.INTEGER,
    sku: Sequelize.STRING,
});

module.exports = VariantProduct;
