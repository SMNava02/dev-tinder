const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NodeAppsUser:Node123@nodeapps.jaomudb.mongodb.net/devTinder"
  );
};

module.exports = { connectToDB };
