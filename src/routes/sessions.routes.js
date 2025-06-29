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
 *                      user_pass: 
 *                          type: string
 *     responses:
 *       200:
 *          description: Created Token
 *       401: 
 *          description: Incorrect fields
 */
sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;