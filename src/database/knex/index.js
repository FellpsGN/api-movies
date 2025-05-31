const knex = require("knex");
const config = require("../../../knexfile.js");

const connection = knex(config.development);

connection.migrate.latest()
    .then(() => {
        console.log("Migrations Done!");
    })
    .catch((err) => {
        console.log("Migrations Failed! - ", err);
    });

module.exports = connection;
