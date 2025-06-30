const knex = require("../database/knex/index.js");

class TagsController {
    async getTags(req, res) {
        const user_id = req.user.user_id;
        const tags = await knex("movies_tags").where({user_id});

        return res.status(200).json(tags);
    };
};

module.exports = TagsController;