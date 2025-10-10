const express = require("express");

const app = new express();

app.use("/", (req, res) => {
  console.log("Request received");
  res.send("Hello!");
});

app.listen(3000);
