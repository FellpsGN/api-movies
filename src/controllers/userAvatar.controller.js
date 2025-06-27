const knex = require("../database/knex/index.js");
const AppError = require("../utils/AppError.js");
const DiskStorage = require("../providers/DiskStorage.js");

class UserAvatarController {
    async update(req, res) {
        const user_id = req.user.user_id;
        const avatarFileName = req.file.filename;
        const diskStorage = new DiskStorage();

        const user = await knex("users").where({ user_id }).first();
        if(!user) {
            throw new AppError("You must be authenticated to change the avatar", 401);
        }
        
        // if(user.user_avatar) {
        //     await diskStorage.deleteFile(user.user_avatar);
        // };

        const fileName = await diskStorage.saveFile(avatarFileName);

        user.user_avatar = fileName;
        await knex("users").update(user).where({ user_id });

        return res.status(204).json();
    }; 
};

module.exports = UserAvatarController;