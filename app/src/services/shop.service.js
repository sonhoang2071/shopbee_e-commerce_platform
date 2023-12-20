const Shop = require("../models/shop.model");

const findByEmail = async ({ email }) => {
    return await Shop.findOne({ where: { email: email } });
};

module.exports = {
    findByEmail,
};
