var fs = require("fs");

const professionPath = "server/models/setup/profession.txt";
const leaderPath = "server/models/setup/leader.txt";
const membersPath = "server/models/setup/members.txt";
const monthPath = "server/models/setup/month.txt";
const confirmSetupPath = "server/models/setup/confirmSetup.txt";

var startGameScreens = [
  { id: 1, path: professionPath, data: "" },
  { id: 2, path: leaderPath, data: "" },
  { id: 3, path: membersPath, data: "" },
  { id: 4, path: monthPath, data: "" },
  { id: 5, path: confirmSetupPath, data: "" },
];

startGameScreens.map((element) => {
  const txtBuffer = fs.readFileSync(element.path);
  element.data = txtBuffer.toString();
});

/**
 * Send screen data from server to client
 * @param {number} req screen id (1-5)
 * @param {json} res json data to manipulate the DOM of setup.html
 */
exports.getGameScreen = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(startGameScreens[req.params.id].data);
};
