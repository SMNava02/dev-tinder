const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = await User.find({ _id: req?.user._id });
    res.send(user);
  } catch (err) {
    console.log(`Unable to fetch user profile Error: ${err.message}`);
    res.status(400).send(`Unable to find user profile: ${err.message}`);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileRequest(req)) {
      throw new Error("Fields to be updated is not allowed");
    }
    let loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    req.send(`${loggedInUser.firstName}, your data is updated successfully!`);
  } catch (err) {
    console.log(`Unable to edit user profile Error: ${err.message}`);
    res.status(400).send(`Unable to edit user profile: ${err.message}`);
  }
});

module.exports = profileRouter;
