const AppError = require("../utils/AppError.js");
const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex/index.js");

class UsersController {
    async create(req, res) {
        const { user_name, user_email, user_pass, user_avatar } = req.body;

        const [user] = await knex("users").where({user_email});

        if(user) {
            throw new AppError("This email is already used.");
        };
        if(!user_name) {
            throw new AppError("Name field is required.");
        };
        if(!user_email) {
            throw new AppError("Email field is required.");
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

    async update(req, res) {
        const { user_id } = req.params;
        const { user_name, user_email, user_pass, old_pass, user_avatar } = req.body;

        const [user] = await knex("users").where({user_id});
        
        if(!user) {
            throw new AppError("User not found.");
        };

        const [userWithUpdatedEmail] = await knex("users").select("user_id", "user_email").where({user_email});
        
        if(userWithUpdatedEmail && userWithUpdatedEmail.user_id !== user.user_id) {
            throw new AppError("This email is already used.");
        };

        user.user_name = user_name ?? user.user_name;
        user.user_email = user_email ?? user.user_email;
        user.user_avatar = user_avatar ?? user.user_avatar;

        if(user_pass && !old_pass) {
            throw new AppError("Old pass is required.");
        };

        if(user_pass && old_pass) {
            const checkOldPassword = await compare(old_pass, user.user_pass);
            if(!checkOldPassword) {
                throw new AppError("Old password incorrect.");
            };

            const hashedPassword = await hash(user_pass, 6);
            user.user_pass = hashedPassword;

            await knex("users")
                .update({
                    user_name: user.user_name,
                    user_email: user.user_email,
                    user_pass: user.user_pass,
                    user_avatar: user.user_avatar
                })
                .where({ user_id });

            return res.status(200).json();
        }


    };  
}
module.exports = UsersController;