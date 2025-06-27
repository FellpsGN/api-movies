const { verify } = require("jsonwebtoken");
const Apperror = require("../utils/AppError.js");
const authConfig = require("../config/auth.js");
const AppError = require("../utils/AppError.js");

function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        throw new AppError("Inválid JWT Token", 401);
    };

    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret);
        req.user = {
            user_id: Number(user_id)
        };

        return next();
    } catch {
        throw new AppError("Inválid JWT Token", 401);
    };
    
};

module.exports = ensureAuthenticated;