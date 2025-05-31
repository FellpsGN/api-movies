const MoviesController = require("../controllers/movies.controller.js");
const { Router } = require("express");

const moviesController = new MoviesController();
const moviesRoutes = Router();

moviesRoutes.post("/:user_id", moviesController.create);

module.exports = moviesRoutes;