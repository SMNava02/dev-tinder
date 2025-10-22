const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = await User.find({ _id: req?.userId });
    res.send(user);
  } catch (err) {
    console.log(`Unable to fetch user profile Error: ${err.message}`);
    res.status(400).send(`Unable to find user profile: ${err.message}`);
  }
});

module.exports = profileRouter;
