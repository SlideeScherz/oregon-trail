var fs = require('fs');
const SetupModel = require('../models/setup/setupData');

const setupDir = 'server/models/setup/';

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
  res.setHeader('Content-Type', 'application/json');
  res.send(setupScreens[req.params.id].data);
};

const assignMoney = (args) => {
  if (args === 'Banker') return 2000;
  else if (args === 'Carpenter') return 1800;
  else if (args === 'Farmer') return 1500;
};

const newProfession = (req, res) => {
  console.log(`newProfession: ${req.params.profession}`);

  SetupModel.SetupData.profession = req.params.profession;
  SetupModel.SetupData.money = assignMoney(req.params.profession);
  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.json(SetupModel.SetupData.profession);
};

const newLeader = (req, res) => {
  SetupModel.SetupData.playerNames[0] = req.params.name;
  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.json(SetupModel.SetupData.playerNames[0]);
};

const newMembers = (req, res) => {
  SetupModel.SetupData.playerNames[1] = req.params.name1;
  SetupModel.SetupData.playerNames[2] = req.params.name2;
  SetupModel.SetupData.playerNames[3] = req.params.name3;
  SetupModel.SetupData.playerNames[4] = req.params.name4;
  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.json(SetupModel.SetupData.playerNames);
};

const newMonth = (req, res) => {
  SetupModel.SetupData.startMonth = req.params.month;
  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.json(SetupModel.SetupData.startMonth);
};

const getSetupData = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(SetupModel.SetupData);
};

module.exports = { getGameScreen, getSetupData, newMonth, newMembers, newLeader, newProfession };
