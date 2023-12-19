class AuthController {
    signUp = async (req, res, next) => {
        try {
            console.log(`signUp::`, req.body);
            return res.status(200).json({
                message: "hello",
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AuthController();
