const multer = require("multer");
const uploadConfig = require("../config/upload.js");
const UsersController = require("../controllers/users.controller.js");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js");
const UserAvatarController = require("../controllers/userAvatar.controller.js");
const { Router } = require("express");

const upload = multer(uploadConfig.MULTER);
const usersRoutes = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", ensureAuthenticated, usersController.getUser);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), usersAvatarController.update);
usersRoutes.delete("/", ensureAuthenticated, usersController.delete);

module.exports = usersRoutes;