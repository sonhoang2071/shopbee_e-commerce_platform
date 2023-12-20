const { CreatedRequestSuccess } = require("../errors/success.response");
const AuthService = require("../services/auth.service");

class AuthController {
    signUp = async (req, res, next) => {
        new CreatedRequestSuccess({
            message: "SignUp Successfully",
            metadata: await AuthService.signUp(req.body),
        }).send(res);
    };
}

module.exports = new AuthController();
