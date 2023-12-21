const jwt = require("jsonwebtoken");
const {
    UnauthorizedRequestError,
    NotFoundRequestError,
} = require("../errors/error.response");
const { asyncHandler } = require("../helpers");
const { findTokenByShopId } = require("../services/personal_token.service");
const HEADER = {
    SHOP_ID: "x-shop-id",
    AUTHORIZATION: "authorization",
    REFRESH_TOKEN: "refresh-token",
};
const authentication = asyncHandler(async (req, res, next) => {
    const shopId = req.headers[HEADER.SHOP_ID];
    if (!shopId) throw new UnauthorizedRequestError("Invalid Request");

    const token = await findTokenByShopId({ shopId });

    if (!token) throw new NotFoundRequestError("Not Found");
    if (req.headers[HEADER.REFRESH_TOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESH_TOKEN];

            jwt.verify(refreshToken, token.publicKey, (err, decode) => {
                if (err) {
                    throw new UnauthorizedRequestError("Invalid Request 1");
                } else {
                    if (shopId != decode.shopId) {
                        throw new UnauthorizedRequestError("Invalid Request 2");
                    }
                    req.token = token;
                    req.shop = decode;
                    req.refreshToken = refreshToken;
                }
            });
            return next();
        } catch (error) {
            throw error;
        }
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new UnauthorizedRequestError("Invalid Request");

    try {
        jwt.verify(accessToken, token.publicKey, (err, decode) => {
            if (err) {
                throw new UnauthorizedRequestError("Invalid Request");
            } else {
                if (shopId != decode.shopId) {
                    throw new UnauthorizedRequestError("Invalid Request");
                }
                req.token = token;
                return next();
            }
        });
    } catch (error) {
        throw error;
    }
});

module.exports = {
    authentication,
};
