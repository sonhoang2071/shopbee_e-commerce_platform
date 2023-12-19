const Sequelize = require("sequelize");

const sequelize = require("../databases");

const Shop = sequelize.define("shop", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});

module.exports = Shop;
