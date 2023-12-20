const {
    CreatedRequestSuccess,
    OkRequestSuccess,
} = require("../errors/success.response");
const AuthService = require("../services/auth.service");

class AuthController {
    signIn = async (req, res, next) => {
        new CreatedRequestSuccess({
            message: "SignIn Successfully",
            metadata: await AuthService.singIn(req.body),
        }).send(res);
    };
    signUp = async (req, res, next) => {
        new CreatedRequestSuccess({
            message: "SignUp Successfully",
            metadata: await AuthService.signUp(req.body),
        }).send(res);
    };
    logout = async (req, res, next) => {
        new OkRequestSuccess({
            message: "Logout Successfully",
            metadata: await AuthService.logout(req.token),
        }).send(res);
    };
}

module.exports = new AuthController();
