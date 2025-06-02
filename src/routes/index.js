const { Router } = require("express");
const usersRoutes = require("./users.routes.js");
const moviesRoutes = require("./movies.routes.js");
const tagsRoutes = require("./tags.routes.js");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;