const Sequelize = require("sequelize");

const sequelize = require("../databases");

const CategoryValue = sequelize.define("category_value", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = CategoryValue;
