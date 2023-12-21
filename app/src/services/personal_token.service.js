const { ceil } = require("lodash");
const PersonalToken = require("../models/personal_token.model");

class PersonalTokenService {
    static createPersonalToken = async ({
        shopId,
        publicKey,
        privateKey,
        refreshToken,
    }) => {
        try {
            const publicKeyString = publicKey.toString();
            const privateKeyString = privateKey.toString();
            const [token, created] = await PersonalToken.findOrCreate({
                where: { shopId: shopId },
                defaults: {
                    shopId: shopId,
                    publicKey: publicKeyString,
                    privateKey: privateKeyString,
                    refreshToken: refreshToken,
                },
            });
            if (!created) {
                await token.update({
                    publicKey: publicKeyString,
                    privateKey: privateKeyString,
                    refreshToken: refreshToken,
                });
            }
            return token ? publicKeyString : null;
        } catch (error) {
            return error;
        }
    };

    static findTokenByShopId = async ({ shopId }) => {
        return await PersonalToken.findOne({ where: { shopId: shopId } });
    };

    static removeTokenById = async ({ id }) => {
        return await PersonalToken.destroy({
            where: {
                id: id,
            },
        });
    };
    static removeTokenByShopId = async ({ shopId }) => {
        return await PersonalToken.destroy({
            where: {
                shopId: shopId,
            },
        });
    };

    static findTokenByRefreshToken = async ({ refreshToken }) => {
        return await PersonalToken.findOne({
            where: { refreshToken: refreshToken },
        });
    };
}

module.exports = PersonalTokenService;
