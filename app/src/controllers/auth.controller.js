const AuthService = require("../services/auth.service");

class AuthController {
    signUp = async (req, res, next) => {
        try {
            console.log(`signUp::`, req.body);
            const result = await AuthService.signUp(req.body);
            return res.status(200).json({
                result
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AuthController();
