const AppError = require("../utils/AppError.js");
const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex/index.js");

class UsersController {
    async create(req, res) {
        const { user_name, user_email, user_pass, user_avatar } = req.body;

        const [user] = await knex("users").where({user_email});

        if(user) {
            throw new AppError("This email is already used.", 409);
        };
        if(!user_name) {
            throw new AppError("Name field is required.", 400);
        };
        if(!user_email) {
            throw new AppError("Email field is required.", 400);
        };
        if(!user_pass) {
            throw new AppError("The password is very important, don't forget it!", 400);
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
        const user_id = req.user.user_id;

        const [user] = await knex("users").select("user_name", "user_email", "user_avatar").where({user_id});

        return res.status(200).json(user);
    };

    async update(req, res) {
        const user_id = req.user.user_id;
        const { user_name, user_email, user_pass, old_pass } = req.body;

        const [user] = await knex("users").where({user_id});
        
        if(!user) {
            throw new AppError("User not found.", 404);
        };

        const [userWithUpdatedEmail] = await knex("users").select("user_id", "user_email").where({user_email});
        
        if(userWithUpdatedEmail && userWithUpdatedEmail.user_id !== user.user_id) {
            throw new AppError("This email is already used.", 409);
        };

        user.user_name = user_name ?? user.user_name;
        user.user_email = user_email ?? user.user_email;

        if(user_pass && !old_pass) {
            throw new AppError("Old pass is required.", 400);
        };

        if(user_pass && old_pass) {
            const checkOldPassword = await compare(old_pass, user.user_pass);
            if(!checkOldPassword) {
                throw new AppError("Old password incorrect.", 400);
            };

            const hashedPassword = await hash(user_pass, 6);
            user.user_pass = hashedPassword;

            await knex("users")
                .update({
                    user_name: user.user_name,
                    user_email: user.user_email,
                    user_pass: user.user_pass
                })
                .where({ user_id });

            return res.status(200).json();
        };
    };  

    async delete(req, res) {
        const user_id = req.user.user_id;
        const { user_email } = req.body;

        const [user] = await knex("users").where({user_id, user_email});
        
        if(!user) {
            throw new AppError("User not found.", 404);
        };

        await knex("users").delete().where({user_id, user_email});

        return res.status(204).json();
        
    }
}
module.exports = UsersController;