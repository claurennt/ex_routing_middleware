require("dotenv").config();
require("./db/client");

const express = require("express");
const app = express();
const port = 3000;

const secure = require("./middlewares/secure");

const usersRouter = require("./routes/usersRouter");
const tokensRouter = require("./routes/tokensRouter");
app.use("/users", usersRouter);
app.use("/tokens", tokensRouter);

//app.get("/verify/:token", secure, (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
