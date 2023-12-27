const Sequelize = require("sequelize");

const sequelize = require("../databases");

const BrandCategory = sequelize.define("brand_category", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = BrandCategory;
