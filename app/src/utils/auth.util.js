const jwt = require("jsonwebtoken");

const createTokensPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days",
        });
        const refreshToken = await jwt.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        });
        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify: `, err);
            } else {
                console.log(`decode verify: `, decode);
            }
        });
        return { accessToken, refreshToken };
    } catch (error) {}
};



module.exports = {
    createTokensPair,
};
