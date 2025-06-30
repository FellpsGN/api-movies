const knex = require("../database/knex/index.js");
const AppError = require("../utils/AppError.js");

class MoviesController {
    async create(req, res) {
        const user_id = req.user.user_id;
        const { movie_note_title, movie_title, movie_note_description, movie_note_rating, tags } = req.body;

        if(movie_note_rating < 0 || movie_note_rating > 5) {
            throw new AppError("Note rating must be between 0 and 5", 409);
        };

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
    };

    async getMovieNotes(req, res) {
        const user_id = req.user.user_id;
        const { movie_note_title, movie_title, tags } = req.query;
        
        const [notes] = await knex({mt: "movies_tags"})
            .select("mn.movie_note_id", "mn.movie_note_title", "mn.movie_title", "mt.tag_name")
            .innerJoin({mn: "movies_notes"}, "mn.movie_note_id", "mt.movie_note_id")
            .where("mn.user_id", user_id)
            .modify((builder) => {
                if(tags) {
                    const filterTags = tags.split(",").map(tag => tag.trim());
                    builder.whereIn("mt.tag_name", filterTags);
                };

                if(movie_title) {
                    builder.whereLike("mn.movie_title", `%${movie_title}%`);
                };

                if(movie_note_title) {
                    builder.whereLike("mn.movie_note_title", `%${movie_note_title}%`);
                };
            });
        return res.status(200).json(notes);
    };

    async delete(req, res) {
        const { movie_note_id } = req.params;
        const user_id = req.user.user_id;
        
        const [movie] = await knex("movies_notes").where({movie_note_id, user_id});
        
        if(!movie) {
            throw new AppError("Movie not found", 404);
        };

        await knex("movies_notes").delete().where({movie_note_id, user_id});

        return res.status(204).json();
    };
}

module.exports = MoviesController;