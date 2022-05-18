const express = require("express");
const { verifyTokenHandler } = require("../controllers/tokens");

const tokensRouter = express.Router();

tokensRouter.route("/verify/:token").get(verifyTokenHandler);

module.exports = tokensRouter;
