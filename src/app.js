const express = require("express");
const { connectToDB } = require("./config/database");
const User = require("./models/user");

const app = new express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    console.log(
      `Request receieved to add a new user: ${JSON.stringify(req.body)}`
    );
    let newUser = new User(req.body);
    await newUser.save();
    res.send("User Added Successfully!");
  } catch (err) {
    console.log(`Error in user add flow: ${err}`);
    res.send(`Unable to add new user to DB: ${err}`);
  }
});

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
