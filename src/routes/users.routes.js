const UsersController = require("../controllers/users.controller.js");
const { Router } = require("express");

const usersController = new UsersController();
const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/:user_id", usersController.getUser);
usersRoutes.put("/:user_id", usersController.update);

module.exports = usersRoutes;