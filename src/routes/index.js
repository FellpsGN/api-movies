const { Router } = require("express");
const usersRoutes = require("./users.routes.js");
const moviesRoutes = require("./movies.routes.js");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);

module.exports = routes;