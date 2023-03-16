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

var app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(cors());
app.use(serveStatic(__dirname + "/public"));

app.get("/", async (req, res) => {
  return res.sendFile("/index.html", { root: __dirname + "/public" });
});

app.post("/update", async (req, res) => {
  const { data, error } = await supabase
    .from("campers")
    .update({ SOCC: req.body.links })
    .eq("id", req.body.userID)
    .select();
  if (error) {
    return res.status(500).json(error);
  }
  return res.status(200).json(data);
});

app.get("/qr/:code", async (req, res) => {
  console.log(req.params.code);
});

// SOC
app.get(
  "/start/e75169589b9641e78815bbf02b5dd5ae87b1f38f93f46aa979f44ee1",
  (req, res) => {
    console.log("hi");
  }
);

app.get(
  "/end/2a5d9639c7dc16c6765a02f0800bbc13fad574ae882962e36af428fe",
  (req, res) => {
    console.log("hi");
  }
);

// EEE
app.get(
  "/start/06b38eae6e3def5ec4a663099b86e22fe95577e00af55ff931e9e6b6",
  (req, res) => {
    console.log("hi");
  }
);

app.get(
  "/end/d95819df3ba623fec705baf34f0f33b1c7bd366e5ed595d2dc1eb972",
  (req, res) => {
    console.log("hi");
  }
);

app.get("/login", async (req, res) => {
  return res.sendFile("/login.html", { root: __dirname + "/public" });
});

app.post("/login", async (req, res) => {
  const { data, error } = await supabase
    .from("campers")
    .select("*")
    .eq("email", req.body.email);
  if (error) {
    return res.status(500).json(error);
  }
  if (data.length < 1) {
    return res.status(404).json(`{
        "message": "email not found"
      }`);
  }
  return res.status(200).json(data);
});

app.get("/signup", async (req, res) => {
  return res.sendFile("/signup.html", { root: __dirname + "/public" });
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
