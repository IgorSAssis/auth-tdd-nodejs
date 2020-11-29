const routes = require("express").Router();

const SessionController = require("./app/controllers/SessionController");

const authMiddleware = require("./app/middleware/auth");

routes.post("/sessions", SessionController.store);

routes.get("/dashboard", authMiddleware, (request, response) => {
    return response.status(200).send();
});

module.exports = routes;
