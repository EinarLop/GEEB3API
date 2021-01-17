const express = require("express");
const cors = require("cors");
require("dotenv").config(); // to load the values specified in .env
var bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3010;

// Require Router modules
const indexRouter = require("./routes/index");
const oprojectsRouter = require("./routes/oprojects");
const sprojectsRouter = require("./routes/sprojects");
const usersRouter = require("./routes/users");
const tagsRouter = require("./routes/tags");
const skillsRouter = require("./routes/skills");

// Mongoose Setup

const mongoose = require("mongoose");
const uri = process.env.CONNECTIONSTRING;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console.error, "MongoDB Connection Error"));
console.log("Connection to mongoDB succesful");

// Middleware libraries for request handling
app.use("/", indexRouter);
app.use("/oprojects", oprojectsRouter);
app.use("/sprojects", sprojectsRouter);
app.use("/users", usersRouter);
app.use("/tags", tagsRouter);
app.use("/skills", skillsRouter);

app.use(express.json());
app.listen(port, () => console.log("Express server up and running: " + port));
