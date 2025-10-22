const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

const app = new express();

app.use(express.json());
app.use(cookieParser());

app.use("/", [authRouter, profileRouter]);

connectToDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
