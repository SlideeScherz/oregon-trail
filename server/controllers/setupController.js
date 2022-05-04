const setupModel = require("../models/setup/setup");

var setupData = setupModel.getSetupObj();

/**
 * Send screen data from server to client
 * Increment the step after a sucessfull response
 * @param {number} req screen id (1-5)
 * @param {json} res json data to manipulate the DOM of setup.html
 * specify ```setupScreens[req.params.id].data```
 */
exports.getGameScreen = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(setupData.screens[req.params.id].data);
  setupData.step++;
};

/**
 * post request from setup.js
 * @param {*} req profession 
 * @param {*} res updated profession
 */
exports.newProfession = function (req, res) {
  setupData.playerProfession = req.params.profession;
  res.setHeader("Content-Type", "application/json");
  res.send(req.params.profession);
};

/**
 * post request from setup.js
 * @param {json} req leader name 
 * @param {json} res players data
 */
exports.newLeader = function (req, res) {
  setupData.players.leader = req.params.name;
  res.setHeader("Content-Type", "application/json");
  res.send(req.params.name);
};

/**
 * post request from setup.js
 * @param {*} req profession 
 * @param {*} res updated profession
 */
exports.newPlayer = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(req.params.name);
};

/**
 * post request from setup.js
 * @param {*} req profession 
 * @param {*} res updated profession
 */
exports.newMonth = function (req, res) {
  setupData.startMonth = req.params.month;
  res.setHeader("Content-Type", "application/json");
  res.send(req.params.month);
};
