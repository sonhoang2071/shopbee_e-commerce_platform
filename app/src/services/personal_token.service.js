const { ceil } = require("lodash");
const PersonalToken = require("../models/personal_token.model");

class PersonalTokenService {
    static createPersonalToken = async ({
        shopId,
        publicKey,
        refreshToken,
    }) => {
        try {
            const publicKeyString = publicKey.toString();
            const [token, created] = await PersonalToken.findOrCreate({
                where: { shopId: shopId },
                defaults: {
                    shopId: shopId,
                    publicKey: publicKeyString,
                    refreshToken: refreshToken,
                },
            });
            if (!created) {
                await token.update({
                    publicKey: publicKeyString,
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
}

module.exports = PersonalTokenService;
