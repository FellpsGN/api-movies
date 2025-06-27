const UsersController = require("../controllers/users.controller.js");
const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js");

const usersController = new UsersController();
const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", ensureAuthenticated, usersController.getUser);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.delete("/", ensureAuthenticated, usersController.delete);

module.exports = usersRoutes;