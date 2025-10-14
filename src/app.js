const express = require("express");
const { connectToDB } = require("./config/database");
const User = require("./models/user");

const app = new express();

app.use(express.json());

//Create new user
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
    res.send(`Unable to add new user: ${err}`);
  }
});

//Find user info by emailId
app.get("/user", async (req, res) => {
  try {
    console.log(`Find user info for Email: ${req.body.emailId}`);
    const userInfo = await User.find({ emailId: req.body.emailId });
    res.send(userInfo);
  } catch (err) {
    console.log(
      `Unable to fetch user info for email: ${req.body.emailId} Error: ${err}`
    );
    res.status(400).send(`Unable to find user info: ${err}`);
  }
});

//Find all users
app.get("/feed", async (req, res) => {
  try {
    console.log(`Finding all users for feed`);
    const userInfo = await User.find();
    res.send(userInfo);
  } catch (err) {
    console.log(`Unable to fetch all users Error: ${err}`);
    res.status(400).send(`Unable to find users: ${err}`);
  }
});

app.delete("/user", async (req, res) => {
  try {
    console.log(`Deleting the user with Id: ${req.body.userId}`);
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    console.log(`Unable to delete user: ${err}`);
    res.status(400).send(`Unable to delete user: ${err}`);
  }
});

app.patch("/user", async (req, res) => {
  try {
    let userId = req.body.userId;
    console.log(`Updating user with Id: ${userId}`);
    await User.findByIdAndUpdate(userId, req.body);
    res.send("User updated successfully");
  } catch (err) {
    console.log(`Unable to update user: ${err}`);
    res.status(400).send(`Unable to update user: ${err}`);
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
