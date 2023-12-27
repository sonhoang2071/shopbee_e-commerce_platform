const Sequelize = require("sequelize");

const sequelize = require("../databases");

const Attribute = sequelize.define("attribute", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: Sequelize.STRING,
});

module.exports = Attribute;
