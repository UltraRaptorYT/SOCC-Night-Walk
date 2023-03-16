require("dotenv").config();
const express = require("express");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");

var port = process.env.PORT || 3000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function fetchData() {
  const { data, error } = await supabase.from("campers").select("id, email");
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

var app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(cors());
app.use(serveStatic(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("/index.html", { root: __dirname + "/public" });
});

app.get("/qr/:code", (req, res) => {
  console.log("hi");
});

app.get("/login", (req, res) => {
  res.sendFile("/login.html", { root: __dirname + "/public" });
});

app.post("/login", async (req, res) => {
  const { data, error } = await supabase
    .from("campers")
    .select("*")
    .eq("email", req.body.email);
  if (error) {
    res.status(500).json(error);
  }
  if (data.length < 1) {
    return res.status(404).json(`{
        "message": "email not found"
      }`);
  }
  return res.status(200).json(data);
});

app.get("/signup", (req, res) => {
  res.sendFile("/signup.html", { root: __dirname + "/public" });
});

app.post("/signup", async (req, res) => {
  const { data, error } = await supabase
    .from("campers")
    .insert({ name: req.body.name, email: req.body.email })
    .select();
  if (error) {
    if (error.code == "23505") {
      return res.status(500).json(`{
        "message": "email already exists"
      }`);
    }
    return res.status(500).json(error);
  }
  return res.status(201).json(data);
});

app.listen(port, function () {
  console.log(`Server hosted at http://localhost:${port}`);
});
