exports.up = knex => knex.schema.createTable("movies_notes", table => {
    table.increments("movie_note_id");
    table.text("movie_note_title").notNullable();
    table.text("movie_title").notNullable();
    table.text("movie_note_description");
    
    table.integer("movie_note_rating");
    table.check("?? >= 0", ["movie_note_rating"]);
    table.check("?? <= 5", ["movie_note_rating"]);

    table.integer("user_id").references("user_id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("movies_notes");
