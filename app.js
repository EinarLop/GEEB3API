const express = require("express");
const cors = require("cors");
require("dotenv").config(); // to load the values specified in .env
 // to load the values specified in .env

const port = process.env.PORT || 3010;
const app = express();

app.use(express.json());
app.use(cors({
  origin: ['https://geeb-3.vercel.app', "http://localhost:3000"],
  exposedHeaders: 'auth-token',
  credentials: true     // so that cookie is received by front
  }));
// Require Router modules
const indexRouter = require("./routes/index");
const oprojectsRouter = require("./routes/oprojects");
const sprojectsRouter = require("./routes/sprojects");
const usersRouter = require("./routes/users");
const tagsRouter = require("./routes/tags");
const applicantsRouter = require("./routes/applicants");

const skillsRouter = require("./routes/skills");

const uri = process.env.CONNECTIONSTRING;


// Mongoose Setup

const mongoose = require("mongoose");
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
app.use("/applicants", applicantsRouter);

app.listen(port, () => console.log("Express server up and running: " + port));