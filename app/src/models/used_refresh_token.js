const Sequelize = require("sequelize");

const sequelize = require("../databases");
const Shop = require("./shop.model");

const UsedRefreshToken = sequelize.define("used_refresh_token", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});
UsedRefreshToken.belongsTo(Shop);

module.exports = UsedRefreshToken;
