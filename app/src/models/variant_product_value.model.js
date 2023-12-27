const Sequelize = require("sequelize");

const sequelize = require("../databases");

const VariantProductValue = sequelize.define("variant_product_value", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = VariantProductValue;
