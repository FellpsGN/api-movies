const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js");
const TagsController = require("../controllers/tags.controller.js");
const { Router } = require("express");


const tagsController = new TagsController();
const tagsRoutes = Router();


/**
 * @swagger
 * /tags:
 *  get:
 *     summary: Get authenticated user data
 *     tags: [Tags]
 *     security:
 *      - bearerAuth: [] 
 *     responses:
 *       200:
 *          description: Tag data returned successfully
 */
tagsRoutes.get("/", ensureAuthenticated, tagsController.getTags);

module.exports = tagsRoutes;