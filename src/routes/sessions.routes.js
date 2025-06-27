const { Router } = require("express");
const SessionsController = require("../controllers/sessions.controller.js");

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;