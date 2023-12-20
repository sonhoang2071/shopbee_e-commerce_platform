const Shop = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const PersonalTokenService = require("./personal_token.service");
const { createTokensPair } = require("../utils/auth.util");
const { getInformationData } = require("../utils/metadata.util");
const {
    BadRequestError,
    ConflictRequestError,
} = require("../errors/error.response");
class AuthService {
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
            const { privateKey, publicKey } = crypto.generateKeyPairSync(
                "rsa",
                {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                    privateKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                }
            );
            const publicKeyString =
                await PersonalTokenService.createPersonalToken({
                    shopId: newShop.id,
                    publicKey: publicKey,
                });
            if (!publicKeyString) {
                throw new ConflictRequestError("CreatePersonalToken is fault");
            }
            const tokens = await createTokensPair(
                { shopId: newShop.id, email },
                publicKey,
                privateKey
            );
            return {
                shop: getInformationData({
                    fields: ["name", "email"],
                    object: newShop,
                }),
                tokens,
            };
            return publicKeyString;
        }
        return {
            code: 200,
            message: "error",
        };
    };
}

module.exports = AuthService;
