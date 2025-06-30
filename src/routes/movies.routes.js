const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js");
const MoviesController = require("../controllers/movies.controller.js");
const { Router } = require("express");

const moviesController = new MoviesController();
const moviesRoutes = Router();


/**
 * @swagger
 * /movies:
 *  post:
 *      summary: Create Movies
 *      tags: [Movies]
 *      requestBody:
 *       required: true
 *       content: 
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      movie_note_title:
 *                          type: string
 *                          example: "Harry and your glasses"
 *                      movie_title: 
 *                          type: string
 *                          example: "Harry Potter and the Prisioner of Azkaban"
 *                      movie_note_description:
 *                          type: string
 *                          example: "They should changed the harry's glasses"
 *                      movie_note_rating:
 *                          type: number
 *                          format: float
 *                          minimum: 0
 *                          maximum: 5
 *                          example: 5
 *                      tags:
 *                          type: array
 *                          items:
 *                              type: string
 *                          example: ["Fantasy", "Adventure"]
 *                      
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          201: 
 *              description: Created Movies and tags
 *          409: 
 *              description: Rate must be between 0 and 5
 * 
 */
moviesRoutes.post("/", ensureAuthenticated, moviesController.create);

/**
 * @swagger
 * /movies:
 *  get:
 *      summary: Get Movies authenticated data
 *      tags: [Movies]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200: 
 *              description: Movies data returned successfully
 */
moviesRoutes.get("/", ensureAuthenticated, moviesController.getMovieNotes);

/**
 * @swagger
 * /movies/{movie_note_id}:
 *  delete:
 *      summary: Delete Movies and related tags
 *      tags: [Movies]
 *      parameters:
 *          - in: path
 *            name: movie_note_id
 *            required: true
 *            schema:
 *             type: string
 *            description: ID of the movie note to retrieve
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204: 
 *              description: Deleted Movie
 *          404: 
 *              description: Movie not found  
 */
moviesRoutes.delete("/:movie_note_id", ensureAuthenticated, moviesController.delete);

module.exports = moviesRoutes;