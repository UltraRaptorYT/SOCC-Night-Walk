/*
Name: Soh Hong Yu
Class: DAAA/FT/1B/01
Admin No.: P2100775
*/

const express = require("express");
const serveStatic = require("serve-static");

var port = process.env.PORT || 3000;

var app = express();

app.use(serveStatic(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("/index.html", { root: __dirname + "/public" });
})

app.listen(port, function () {
  console.log(`Server hosted at http://localhost:${port}`);
});
