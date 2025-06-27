const { sign } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const knex = require("../database/knex/index.js");
const AppError = require("../utils/AppError.js");
const authConfig = require("../config/auth.js");

class SessionsController {
    async create(req, res) {
        const { user_email, user_pass } = req.body;
        
        const user = await knex("users").where({ user_email }).first();
        if(!user) {
            throw new AppError("Invalid E-mail or password", 401);
        };

        const passwordMatched = await compare(user_pass, user.user_pass);
        if(!passwordMatched) {
            throw new AppError("Invalid E-mail or password", 401);
        };

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.user_id),
            expiresIn
        });

        return res.status(200).json({ user, token });
    };
};

module.exports = SessionsController;