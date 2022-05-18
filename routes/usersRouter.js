// In your NodeJs Server, create routes to :
// Create a user
// Create a token for a specific user

const express = require("express");
const { createNewUser, createTokenForUser } = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.route("/").post(createNewUser);

usersRouter.route("/:userId/token").post(createTokenForUser);

module.exports = usersRouter;
