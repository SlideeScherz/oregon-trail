var fs = require("fs");

const pathDir = "server/models/setup";

var startGameScreens = [
  { id: 1, path: `${pathDir}/profession.txt`, data: "" },
  { id: 2, path: `${pathDir}/leader.txt`, data: "" },
  { id: 3, path: `${pathDir}/members.txt`, data: "" },
  { id: 4, path: `${pathDir}/month.txt`, data: "" },
  { id: 5, path: `${pathDir}/confirmSetup.txt`, data: "" },
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
