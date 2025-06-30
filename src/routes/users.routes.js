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

/**
 * @swagger
 * /users:
 *  post:
 *     summary: Create a user
 *     tags:
 *      - Users
 * 
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      user_name:
 *                          type: string
 *                          example: "Fulano"
 *                      user_email: 
 *                          type: string
 *                          example: "fulano.silva@email.com"
 *                      user_pass:
 *                          type: string
 *                          example: "fulano12345"
 * 
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *          description: Required params
 *       409: 
 *          description: E-mail already used
 */
usersRoutes.post("/", usersController.create);

/**
 * @swagger
 * /users:
 *  get:
 *     summary: Get authenticated user data
 *     tags: [Users]
 *     security:
 *      - bearerAuth: [] 
 *     responses:
 *       200:
 *          description: User data returned successfully
 */
usersRoutes.get("/", ensureAuthenticated, usersController.getUser);

/**
 * @swagger
 * /users:
 *  put:
 *      summary: Update user
 *      tags: [Users]
 *      security: 
 *          - bearerAuth: []
 *      
 *      requestBody:
 *       required: true
 *       content: 
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      user_name:
 *                          type: string
 *                      user_email: 
 *                          type: string
 *                      user_pass:
 *                          type: string
 *                      old_pass:
 *                          type: string
 * 
 *      responses:
 *          200:
 *              description: Updated user
 *          400: 
 *              description: Required params
 *          404:
 *              description: User not found
 *          409: 
 *              description: E-mail already used
 */
usersRoutes.put("/", ensureAuthenticated, usersController.update);


/**
 * @swagger
 * /users/avatar:
 *  patch:
 *      summary: Update user avatar
 *      tags: [Users]
 *      security: 
 *          - bearerAuth: []
 *      
 *      requestBody:
 *       required: true
 *       content: 
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      avatar:
 *                          type: string
 *                          format: binary
 * 
 *      responses:
 *          204:
 *              description: User avatar updated
 *          401: 
 *              description: Unauthorized - JWT token is missing or invalid
 *          
 */
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), usersAvatarController.update);

/**
 * @swagger
 * /users:
 *  delete:
 *      summary: Delete User
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      user_email:
 *                          type: string
 *      responses:
 *          204: 
 *              description: Deleted User
 *          404:
 *              description: User not found
 *          
 */
usersRoutes.delete("/", ensureAuthenticated, usersController.delete);

module.exports = usersRoutes;