const { Router } = require("express");
const SessionsController = require("../controllers/sessions.controller.js");

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

/**
 * @swagger
 * /sessions:
 *  post:
 *     summary: Create JWT Token
 *     tags: 
 *      - Sessions  
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema: 
 *                  type: object
 *                  properties:
 *                      user_email: 
 *                          type: string
 *                          example: "fulano.silva@email.com"
 *                      user_pass: 
 *                          type: string
 *                          example: "fulano12345"
 *     responses:
 *       200:
 *          description: Created Token
 *       401: 
 *          description: Incorrect fields
 */
sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;