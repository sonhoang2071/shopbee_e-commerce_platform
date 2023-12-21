const Shop = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const PersonalTokenService = require("./personal_token.service");
const { createTokensPair } = require("../utils/auth.util");
const { getInformationData } = require("../utils/metadata.util");
const {
    BadRequestError,
    ConflictRequestError,
    UnauthorizedRequestError,
    ForbiddenRequestError,
} = require("../errors/error.response");
const { findByEmail } = require("./shop.service");
const UsedRefreshToken = require("../models/used_refresh_token");
const UsedRefreshTokenService = require("./used_refresh_token.service");
class AuthService {
    static singIn = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail({ email });
        if (!foundShop) {
            throw new BadRequestError("Shop not registered");
        }
        const match = await bcrypt.compare(password, foundShop.password);
        if (!match) {
            throw new UnauthorizedRequestError("Invalid value");
        }
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
        });
        const tokens = await createTokensPair(
            { shopId: foundShop.id, email },
            publicKey,
            privateKey
        );

        const check = await PersonalTokenService.createPersonalToken({
            shopId: foundShop.id,
            publicKey: publicKey,
            privateKey: privateKey,
            refreshToken: tokens.refreshToken,
        });
        return {
            shop: getInformationData({
                fields: ["name", "email"],
                object: foundShop,
            }),
            tokens,
        };
    };
    static signUp = async ({ name, email, password }) => {
        const holdShop = await Shop.findOne({ where: { email: email } });
        if (holdShop) {
            throw new BadRequestError("Shop already existed");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newShop = await Shop.create({
            name,
            email,
            password: hashPassword,
        });
        if (newShop) {
            return {
                shop: getInformationData({
                    fields: ["name", "email"],
                    object: newShop,
                }),
            };
        }
        throw new BadRequestError("Bad Request");
    };

    static logout = async (token) => {
        console.log(token);
        const removeToken = await PersonalTokenService.removeTokenById({
            id: token.id,
        });

        return removeToken;
    };

    static handlerRefreshToken = async ({ refreshToken, shop, token }) => {
        const { shopId, email } = shop;
        const foundToken = await UsedRefreshTokenService.findRefreshTokenUsed({
            refreshToken,
            shopId,
        });
        if (foundToken) {
            await PersonalTokenService.removeTokenByShopId({ shopId });
            await UsedRefreshToken.destroy({
                where: { shopId: shopId },
            });
            throw new ForbiddenRequestError(
                "Something went wrong! Please login against"
            );
        }

        if (token.refreshToken !== refreshToken) {
            throw new UnauthorizedRequestError("Shop not registered");
        }

        const foundShop = await findByEmail({ email });
        if (!foundShop) {
            throw new UnauthorizedRequestError("Shop not registered");
        }
        const tokens = await createTokensPair(
            { shopId: foundShop.id, email },
            token.publicKey,
            token.privateKey
        );
        console.log(token);
        await token.update({
            refreshToken: tokens.refreshToken,
        });
        await UsedRefreshToken.create({
            token: refreshToken,
            shopId: shopId,
        });
        const tmp = "hi";
        return {
            shop: getInformationData({
                fields: ["name", "email"],
                object: foundShop,
            }),
            tokens,
        };
    };
}

module.exports = AuthService;
