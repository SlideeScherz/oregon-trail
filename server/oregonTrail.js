const express = require("express");
const app = express();
const setupController = require("./controllers/setupController");
const gameController = require("./controllers/gameController");
const bodyParser = require("body-parser");

// required to parse the body of a post request
app.use(bodyParser.json({ type: "application/json" }));
app.use(express.static("./client/public"));

const port = 1337;

//const fileOptions = { root: "./client/views" };

// serve HTML pages
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./client/views" });
});
app.get("/mainmenu", (req, res) => {
  res.sendFile("mainmenu.html", { root: "./client/views" });
});
app.get("/setup", (req, res) => {
  res.sendFile("setup.html", { root: "./client/views" });
});
app.get("/trail", (req, res) => {
  res.sendFile("trail.html", { root: "./client/views" });
});

/** setup routes */

// setupController <-> setup
app.route("/api/setup/screen/:id").get(setupController.getGameScreen);

// gameController <-> setup
app.route("/api/setup/leader/:name").post(gameController.setLeader);

// gameController <-> setup
app
  .route("/api/setup/member/:name2/:name3/:name4/:name5")
  .post(gameController.setMembers);

// gameController <-> setup
app
  .route("/api/setup/profession/:profession")
  .post(gameController.pickProfession);

// gameController <-> setup  
app.route("/api/setup/month/:month").post(gameController.setMonth);

/** game routes */

// simulate all game components and send updates data to trail.js
app.route("/api/game/advanceDay").get(gameController.advanceDay);

app.route("/api/game/data/").get(gameController.getGameData);

app.route("/api/game/data/pace/:id").post(gameController.setCurrentPace);

// reset game from client
app.route("/api/game/reset").get(gameController.resetGame);

// deploy server
app.listen(port, (err) => {
  if (err) return console.log(`${err} Cannot Listen on port: ${port}`);
  console.log(`Server is Listening on: http://localhost:${port}/`);
});
