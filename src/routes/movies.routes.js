const MoviesController = require("../controllers/movies.controller.js");
const { Router } = require("express");

const moviesController = new MoviesController();
const moviesRoutes = Router();

moviesRoutes.post("/:user_id", moviesController.create);
moviesRoutes.get("/:user_id", moviesController.getMovieNotes);

module.exports = moviesRoutes;