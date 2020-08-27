const express = require("express");

const app = express();

app.listen(10000);

const cors = require("cors");

const userRouter = require("./router/user.js");

const proRouter = require("./router/pro.js");

const bodyparser = require("body-parser");

app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);

app.use(
  cors({
    origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
  })
);

app.use(express.static("public"));

app.use("/user", userRouter);

app.use("/pro", proRouter);
