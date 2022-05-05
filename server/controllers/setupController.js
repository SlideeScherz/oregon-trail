var fs = require("fs");

const setupDir = "server/models/setup/";

// get all filenames in the setup directory
const setupPaths = fs.readdirSync(setupDir);

// add DOM data to element member of screens
const setupScreens = setupPaths.map((path, index) => {
  const txtBuffer = fs.readFileSync(`${setupDir}${path}`);
  return { id: index, data: txtBuffer.toString() };
});

/**
 * Send screen data from server to client
 * @param {number} req screen id (1-5)
 * @param {json} res json data to manipulate the DOM of setup.html
 */
const getGameScreen = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(setupScreens[req.params.id].data);
};

module.exports = { getGameScreen };
