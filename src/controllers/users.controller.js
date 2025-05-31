const AppError = require("../utils/AppError.js");
const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex/index.js");

class UsersController {
    async create(req, res) {
        const { user_name, user_email, user_pass, user_avatar } = req.body;

        const [user] = await knex("users").where({user_email});

        if(user) {
            throw new AppError("This email is already used!");
        };
        if(!user_name) {
            throw new AppError("Name field is required!");
        };
        if(!user_email) {
            throw new AppError("Email field is required!");
        };
        if(!user_pass) {
            throw new AppError("The password is very important, don't forget it!");
        };

        const hashedPassword = await hash(user_pass, 6);
        await knex("users").insert({
            user_name, 
            user_email, 
            user_pass: hashedPassword, 
            user_avatar
        });

        return res.status(201).json();
    };

    async getUser(req, res) {
        const { user_id } = req.params;

        const [user] = await knex("users").select("user_name", "user_email", "user_avatar").where({user_id});

        res.status(200).json(user);
    };
}
module.exports = UsersController;