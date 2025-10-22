const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./config/database");
const User = require("./models/user");
const { userAuth } = require("./middleware/auth");

const app = new express();

app.use(express.json());
app.use(cookieParser());

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

app.post("/login", async (req, res) => {
  try {
    console.log(
      `Validating the user credentials for login: ${JSON.stringify(req.body)}`
    );
    let { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    console.log(`User found: ${user}`);
    isPasswordValid = bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }
    //Create a JWT token and add to the cookie
    const token = jwt.sign({ userId: user._id }, "DEVT1NDER@1");
    console.log(`token created: ${token}`);
    res.cookie("token", token);
    res.send("Login Successfull");
  } catch (err) {
    res.send(`Invalid Credentials`);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await User.find({ _id: req?.userId });
    res.send(user);
  } catch (err) {
    console.log(`Unable to fetch user profile Error: ${err.message}`);
    res.status(400).send(`Unable to find user profile: ${err.message}`);
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
