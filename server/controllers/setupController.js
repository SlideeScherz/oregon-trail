var fs = require("fs");

const setupDir = "server/models/setup/";

// get all filenames in the setup directory
const setupPaths = fs.readdirSync(setupDir);

// return file data as text
const rwData = (filePath) => fs.readFileSync(`${setupDir}${filePath}`);

// add DOM data to element member of screens
const setupScreens = setupPaths.map((path, index) => {
  return { id: index, data: rwData(path) };
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
