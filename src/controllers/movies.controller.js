const knex = require("../database/knex/index.js");

class MoviesController {
    async create(req, res) {
        const { user_id } = req.params;
        const { movie_note_title, movie_title, movie_note_description, movie_note_rating, tags } = req.body;

        const [movie_note_id] = await knex("movies_notes").insert({
            movie_note_title,
            movie_title,
            movie_note_description,
            movie_note_rating,
            user_id
        });

        const tagsInsert = tags.map(tag => {
            return {
                movie_note_id,
                user_id,
                tag_name: tag
            };
        });

        await knex("movies_tags").insert(tagsInsert);

        return res.status(201).json();
    }
}

module.exports = MoviesController;