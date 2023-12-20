const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../databases");
const Shop = require("./shop.model");

const PersonalToken = sequelize.define("personal_token", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    publicKey: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    refreshToken:  {
        type: Sequelize.TEXT,

    }
});

PersonalToken.belongsTo(Shop);

module.exports = PersonalToken;