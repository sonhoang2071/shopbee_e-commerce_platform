const Sequelize = require("sequelize");

const sequelize = require("../databases");

const Brand = sequelize.define("brand", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
});

module.exports = Brand;
