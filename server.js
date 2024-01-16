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

app.get("/login", async (req, res) => {
  return res.sendFile("/login.html", { root: __dirname + "/public" });
});

app.post("/login", async (req, res) => {
  const { data, error } = await supabase
    .from("campers")
    .select("*")
    .eq("email", req.body.email.toLowerCase());
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
    .insert({ name: req.body.name, email: req.body.email.toLowerCase() })
    .select();
  if (error) {
    if (error.code == "23505") {
      return res.status(500).json(`{
        "message": "email already exists"
      }`);
    }
    return res.status(500).json(error);
  }
  const SOCCQR = await supabase.from("SOCCQR").insert({
    userid: data[0].id,
    qr: JSON.stringify({
      R: 0,
      Y: 0,
      G: 0,
      B: 0,
    }),
  });
  return res.status(201).json(data);
});

// Start & End & QR

var urlArr = [
  "abd37534c7d9a2efb9465de931cd7055ffdb8879563ae98078d6d6d5",
  "c681e18b81edaf2b66dd22376734dba5992e362bc3f91ab225854c17",
  "1053463d383dc1e87f06fff34b3c6a2d340d91e184d46d70144ffa5a",
  "06c9f71496e24dec6acc44895648cf9ec40b5cebb7bc4858a3c69f25",
  "d5070e2f67ededca022f81f2941900606b16f3196b2268e856295f59",
  "d4bf0e3ad56b3494897f5f0a1ce7b300e7dc8d838d1a384ce121bf7a",
  "61246db30c51c3fe46779bcfc01eb6b3d2dee9d77d6837024134d8a9",
  "e0ccaeadfef916630c35576679e4cd4b438e7fc95a60b7361705f708",
  "9d4e0997db72e9c1d02a39b8fb969f508a0f65e5303118de9e037a02",
  "fcd074cdd4c6e02b5dbe28f33858f8ed6d3e9e5ca5ff873f07371f3f",
  "5006bab5782456808d60bddfa64db2d13d90b2c5550ba1ff2b2acad7",
  "2e0cc996fafd71bfabc0717628bd3296306b078910b68f081f3d3fcc",
  "4fde0463771d8c4fb82794d5d6d003725c819dd34360e7bf9c70cffe",
  "73363bb5e0e56db01ad3853166fa945628d165930473b5ee5608edeb",
  "cbb625b441474e8dd944e43632d9112c7e4213cce5410b5b3ce59f56",
  "e22bd066f428b7a77a1b936f99c1f4c117b856705d8f90379579f1e9",
  "8acd70840f1928a2a80c548d7599a07e752a6804612469d1dabac68a",
  "90ffc2300bfbe8fbdddb57bc85db44fd0217b079b14e729e9ac98227",
  "0dd8c67786f88335c6caf127b82032f47633948703d7f3dfd9d61fc0",
  "991a908ad5fc70a65e7d36714f4d2088809a8842c89d56dd421fcb45",
  "df4e71601e2a93f5d17e9599f25acd249f3fb20cf57ed8e1d56aba76",
  "5e4165a6124f2afc058d013b360ff4444fe16e69048092a4f635caea",
  "54a2f7f92a5f975d8096af77a126edda7da60c5aa872ef1b871701ae",
  "518d3dd9f8f74ecc34ed7d6ce4310b5fbab8f222b1006ffaf6ea0c43",
  "2c89060719a95c7cb741f04e36835430436840e3052273676c6c1a99",
  "5cfe2cddbb9940fb4d8505e25ea77e763a0077693dbb01b1a6aa94f2",
  "d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f",
  "484d52691fcadbfabec5a318d1cf9692c7f293cbc8c1d5f22b2d839b",
  "7497e88b8c64062edfb2f30b9c5f845552b841d1fbae97ab3f224f74",
  "5b1cfa35e55802f5bcd92750b9f1441d63ddeabba543f9f7d87d8fb3",
  "02f7a0298bd2ac3c3137a53a07c82ef4f3c0ed66c1aefd04b7b84df8",
  "85f17f3cca77dc064e1111a73d02552b70aa1c36fed440c978e14bc9",
  "7e27c59a202f5e2b2b3b5458300140ef7aa7edc3a97a605b788546a1",
  "ef184d8975e8aa87ba5f2500ecd910180558c865029f92a85fb2c73d",
  "b33236e4dd7aec12d1895480cdbec351586f18b3745679a12b7eacfa",
  "358223f683592f32c35f2678fac433704728a2bf06d5737aec8dde7b",
  "47c610004849d61c865c72bb64e82d83a5d1cdd7b6c5ca28cb1612bc",
  "95b55c1004f725be3e353e4c231b6905ab662af7bb31032856b087e7",
  "99c9625f6bcdc158d4fecdde3563eaad1f87b19a1e30fc1c180bc942",
  "90df76dd1bcc659ed8aaac1332105a825294b31d6b175e31d7fc78c9",
  "271cec0cfa54360567069fd3b545a5f7085a81f496ae9139b10aeb75",
  "7518962a0ac1909fa5f33e1da0c759da3dcea0158db1c72783f0dd5f",
  "aa2c1829f58f0b85a1bc4ede83112ce4b7ed71a83e3d549e279d23d0",
  "2a02fbcc0987071ad700b0cd15acae0dffcac644117d0522f4d07be0",
  "3036a47f4a98aa71b4638eb3ec1a343bbdec68f2ce0cf1c247a69a0c",
  "b8a749de2f3dd84fd1f82796271b76a41c6567c2181df0e465421a9b",
  "9791fde696023fceafb9f1456a710297fd61dc4161f56cb877215680",
  "e17336dbdccdf836f7a3cb5b01151cdea33183bfe1677094e1807915",
  "f00bdeb2cd9da240a57c951fdf1bcba509fd0cd83c5e5ad9a669de12",
  "b12ba16a92bb4260f0b011d89573a3273ab52d7213e8e1d2183260e8",
  "e75169589b9641e78815bbf02b5dd5ae87b1f38f93f46aa979f44ee1",
  "2a5d9639c7dc16c6765a02f0800bbc13fad574ae882962e36af428fe",
  "06b38eae6e3def5ec4a663099b86e22fe95577e00af55ff931e9e6b6",
  "d95819df3ba623fec705baf34f0f33b1c7bd366e5ed595d2dc1eb972",
  "5cfe2cddbb9940fb4d8505e25ea77e763a0077693dbb01b1a6aa94f2",
  "a8dfe9873e71c1e2c2ff4decd814264d9a27693d0180e479dffaea4f",
  "e495146b841a91df32daa714325a4eaa4ce43e1b517e50e49f6707da",
  "b878830c88e4372204be0ac53781507936279ee68c38c9bf14f7cca0",
  "199ca440800489f6f24fbb1b37c76ae58dce7ec57d7b251e06566682",
];

app.get("/progress/:userID", async (req, res) => {
  var userID = req.params.userID;
  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("userid", userID);
  if (error) {
    return res.status(500).json(error);
  }
  return res.status(200).json(data);
});

app.get("/:userID/SOCC", async (req, res) => {
  var userID = req.params.userID;
  const { data, error } = await supabase
    .from("SOCCQR")
    .select("qr")
    .eq("userid", userID);
  if (error) {
    return res.status(500).json(error);
  }
  return res.status(200).json(data[0]);
});

app.post("/:userID/SOCC", async (req, res) => {
  var userID = req.params.userID;
  const { data, error } = await supabase
    .from("SOCCQR")
    .update({ qr: req.body.qr })
    .eq("userid", userID)
    .select();
  if (error) {
    return res.status(500).json(error);
  }
  return res.status(200).json(data[0]);
});

app.get("/:progress/:code", async (req, res) => {
  return res.sendFile("/index.html", { root: __dirname + "/public" });
});

app.post("/:progress/:code", async (req, res) => {
  if (urlArr.includes(req.params.code)) {
    if (req.params.progress == "start") {
      var routeName;
      if (
        req.params.code ==
        "e75169589b9641e78815bbf02b5dd5ae87b1f38f93f46aa979f44ee1"
      ) {
        routeName = "SOC";
      } else {
        routeName = "EEE";
      }
      const { error } = await supabase.from("progress").insert({
        userid: req.body.userID,
        start_time: new Date(),
        route_name: routeName,
      });
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(`{
        "message": "${routeName}"
      }`);
    } else if (req.params.progress == "end") {
      var routeName;
      if (
        req.params.code ==
        "2a5d9639c7dc16c6765a02f0800bbc13fad574ae882962e36af428fe"
      ) {
        routeName = "SOC";
      } else {
        routeName = "EEE";
      }
      const { error } = await supabase
        .from("progress")
        .update({ exit_time: new Date() })
        .eq("userid", req.body.userID)
        .eq("route_name", routeName);
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(`{
        "message": "OK"
      }`);
    } else {
      const { error } = await supabase.from("SOCC").insert({
        userid: req.body.userID,
        code: req.params.code,
      });
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(`{
        "message": "QR"
      }`);
    }
  }
});

// app.get(
//   "/start/e75169589b9641e78815bbf02b5dd5ae87b1f38f93f46aa979f44ee1",
//   async (req, res) => {
//     return res.redirect("/");
//   }
// );

// app.get(
//   "/end/2a5d9639c7dc16c6765a02f0800bbc13fad574ae882962e36af428fe",
//   async (req, res) => {
//     return res.redirect("/");
//   }
// );

// // EEE
// app.get(
//   "/start/06b38eae6e3def5ec4a663099b86e22fe95577e00af55ff931e9e6b6",
//   async (req, res) => {
//     return res.redirect("/");
//   }
// );

// app.get(
//   "/end/d95819df3ba623fec705baf34f0f33b1c7bd366e5ed595d2dc1eb972",
//   async (req, res) => {
//     return res.redirect("/");
//   }
// );

app.post("/reset", async (req, res) => {
  var { error } = await supabase
    .from("SOCCQR")
    .update({
      qr: JSON.stringify({
        R: 0,
        Y: 0,
        G: 0,
        B: 0,
      }),
    })
    .eq("userid", req.body.userID);
  if (error) {
    return res.status(500).json(error);
  }
  var { error } = await supabase
    .from("SOCC")
    .delete()
    .eq("userid", req.body.userID);
  if (error) {
    return res.status(500).json(error);
  }
  return res.status(204).json();
});

app.listen(port, function () {
  console.log(`Server hosted at http://localhost:${port}`);
});
