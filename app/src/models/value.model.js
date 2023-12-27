const Sequelize = require("sequelize");

const sequelize = require("../databases");

const Value = sequelize.define("value", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    value: Sequelize.STRING,
});

module.exports = Value;
