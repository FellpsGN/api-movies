
exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("user_id");
    
    table.text("user_name").notNullable();
    table.text("user_email").notNullable().unique();
    table.text("user_pass").notNullable();
    table.text("user_avatar");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
}) 

exports.down = knex => knex.schema.dropTable("users");
