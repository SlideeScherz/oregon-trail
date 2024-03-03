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
app.get("/index", (_, res) => {
  res.sendFile("index.html", { root: "./client/views" });
});
app.get("/mainmenu", (_, res) => {
  res.sendFile("mainmenu.html", { root: "./client/views" });
});
app.get("/setup", (_, res) => {
  res.sendFile("setup.html", { root: "./client/views" });
});
app.get("/trail", (_, res) => {
  res.sendFile("trail.html", { root: "./client/views" });
});

/** setup routes */

// setupController <-> setup
app.route("/api/setup/screen/:id").get(setupController.getGameScreen);

// gameController <-> setup
app.route("/api/setup/leader/:name").post(setupController.newLeader);

// setupController <-> setup
app
  .route("/api/setup/member/:name1/:name2/:name3/:name4")
  .post(setupController.newMembers);

// setupController <-> setup
app
  .route("/api/setup/profession/:profession")
  .post(setupController.newProfession);

// setupController <-> setup
app.route("/api/setup/month/:month").post(setupController.newMonth);

// setupController <-> setup.js
app.route("/api/setup/data").get(setupController.getSetupData);

/** game routes */

// simulate all game components and send updates data to trail.js
app.route("/api/game/advanceDay").get(gameController.advanceDay);

app.route("/api/game/data/").get(gameController.getGameData);

app.route("/api/game/data/pace/:id").post(gameController.updatePace);

// reset game from client
app.route("/api/game/reset").get(gameController.resetGame);

// deploy server
app.listen(port, (err) => {
  if (err) return console.error(`${err} Cannot Listen on port: ${port}`);
  console.log(`Server is Listening on: http://localhost:${port}/`);
});
