
exports.up = knex => knex.schema.createTable("movies_tags", table => {
    table.increments("tag_id");
    
    table.integer("movie_note_id").references("movie_note_id").inTable("movies_notes").onDelete("CASCADE");
    table.integer("user_id").references("user_id").inTable("users");

    table.text("tag_name");
});


exports.down = knex => knex.schema.dropTable("movies_tags");
