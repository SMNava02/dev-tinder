const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  const jwtToken = req.cookies.token;

  console.log(`JWT token for profile: ${jwtToken}`);

  //Validate the JWT and extract userId to fetch profile from DB
  const decoded = await jwt.verify(jwtToken, "DEVT1NDER@1");
  console.log(`Decoded JWT: ${JSON.stringify(decoded)}`);

  // Extract the logged in user info
  req.user = User.findById(decoded.userId);

  next();
};

module.exports = { userAuth };
