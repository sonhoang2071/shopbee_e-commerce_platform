const Shop = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const PersonalTokenService = require("./personal_token.service");
const { createTokensPair } = require("../utils/auth.util");
const { getInformationData } = require("../utils/metadata.util");
class AuthService {
    static signUp = async ({ name, email, password }) => {
        try {
            const holdShop = await Shop.findOne({ where: { email: email } });
            if (holdShop) {
                return {
                    code: "xxx",
                    message: "Shop already registered",
                };
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
                    return {
                        code: "xxx",
                        message: "publicKeyString error",
                    };
                }
                const tokens = await createTokensPair(
                    { shopId: newShop.id, email },
                    publicKey,
                    privateKey
                );
                return {
                    code: 201,
                    metadata: {
                        shop: getInformationData({
                            fields: ["name", "email"],
                            object: newShop,
                        }),
                        tokens,
                    },
                };
                return publicKeyString;
            }
            return {
                code: 200,
                message: "error",
            };
        } catch (error) {
            return {
                message: error.message,
                status: "error",
            };
        }
    };
}

module.exports = AuthService;
