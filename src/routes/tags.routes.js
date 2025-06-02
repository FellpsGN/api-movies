const TagsController = require("../controllers/tags.controller.js");
const { Router } = require("express");

const tagsController = new TagsController();
const tagsRoutes = Router();

tagsRoutes.get("/:user_id", tagsController.getTags);

module.exports = tagsRoutes;