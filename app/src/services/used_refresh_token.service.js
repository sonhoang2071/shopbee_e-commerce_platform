const UsedRefreshToken = require("../models/used_refresh_token");

class UsedRefreshTokenService {
    static findRefreshTokenUsed = async ({ refreshToken, shopId }) => {
        return await UsedRefreshToken.findOne({
            where: { token: refreshToken, shopId: shopId },
        });
    };
}

module.exports = UsedRefreshTokenService;
