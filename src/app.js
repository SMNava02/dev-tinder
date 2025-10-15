const express = require("express");
const bcrypt = require("bcrypt");
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
    //TODO: Validate the req.body using helper function
    let { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    let newUser = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await newUser.save();
    res.send("User Added Successfully!");
  } catch (err) {
    console.log(`Error in user add flow: ${err.message}`);
    res.send(`Unable to add new user: ${err.message}`);
  }
});

app.post("login", (req, res) => {
  try {
    console.log("Validating the user credentials for login");
    let { emailId, password } = req.body;
    const user = User.find({ emailId });
    isPasswordValid = bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }
    res.send("Login Successfull");
  } catch (err) {
    res.send(`Invalid Credentials`);
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
    res.status(400).send(`Unable to find user info: ${err.message}`);
  }
});

//Find all users
app.get("/feed", async (req, res) => {
  try {
    console.log(`Finding all users for feed`);
    const userInfo = await User.find();
    res.send(userInfo);
  } catch (err) {
    console.log(`Unable to fetch all users Error: ${err.message}`);
    res.status(400).send(`Unable to find users: ${err.message}`);
  }
});

app.delete("/user", async (req, res) => {
  try {
    console.log(`Deleting the user with Id: ${req.body.userId}`);
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    console.log(`Unable to delete user: ${err.message}`);
    res.status(400).send(`Unable to delete user: ${err.message}`);
  }
});

app.patch("/user/:userId", async (req, res) => {
  try {
    let userId = req.params.userId;
    console.log(`Updating user with Id: ${userId}`);
    // Add allowded user fields to be updated
    const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "age"];
    let isUpdateAllowed = Object.keys(req.body).every((value) =>
      value.includes(ALLOWED_UPDATES)
    );
    if (!isUpdateAllowed) {
      throw new Error(
        "Allowed fields for update are [photoUrl, about, skills, age]"
      );
    }
    await User.findByIdAndUpdate(userId, req.body);
    res.send("User updated successfully");
  } catch (err) {
    console.log(`Unable to update user: ${err.message}`);
    res.status(400).send(`Unable to update user: ${err.message}`);
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
