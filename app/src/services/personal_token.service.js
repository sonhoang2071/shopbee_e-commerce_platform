const PersonalToken = require("../models/personal_token.model");

class PersonalTokenService {
    static createPersonalToken = async ({ shopId, publicKey }) => {
        try {
            const publicKeyString = publicKey.toString();
            const tokens = await PersonalToken.create({
                shopId: shopId,
                publicKey: publicKeyString,
            });
            return tokens ? publicKeyString : null;
        } catch (error) {
            return error;
        }
    };
}

module.exports = PersonalTokenService;
