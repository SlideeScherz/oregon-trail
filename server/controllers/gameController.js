const terrainModel = require("../models/terrain");
const gameDataModel = require("../models/gameData");
const paceModel = require("../models/pace");
const weatherModel = require("../models/weather");

// import models
const gameStats = gameDataModel.gameDataObj;
const paces = paceModel.paces;
const terrains = terrainModel.terrain;
const weathers = weatherModel.weather;

// reset all to null
const resetGame = (req, res) => {
  gameStats.pace = paceModel.defaultPace;
  gameStats.weather = weathers[2];
  gameStats.terrain = terrains[0];
  gameStats.messages = [""];
  gameStats.playerNames = [""];
  gameStats.playerStatus = [""];
  gameStats.profession = "";
  gameStats.money = 0;
  gameStats.startMonth = "";
  gameStats.milesTraveled = 0;
  gameStats.groupHealth = 100;
  gameStats.daysOnTrail = 0;
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats)
};

// speed and distance
const miles = () => gameStats.milesTraveled;

const pSpeed = () => gameStats.pace.mileage;

const wSpeed = () => gameStats.weather.mileEffect;

const speedEff = (arg1, arg2) => arg1 + arg2;

const updateMiles = () => miles() + speedEff(pSpeed(), wSpeed());

// health
const alive = (args) => args > 0;

const health = () => gameStats.groupHealth;

const pHealth = () => gameStats.pace.healthEffect;

const wHealth = () => gameStats.weather.healthEffect;

const healthEff = (arg1, arg2) => arg1 + arg2;

const updateHealth = () => health() + healthEff(pHealth(), wHealth());

// weather 
const simulateWeather = (args) => {
  var threshold = 0;

  for (let i = 0; i < weathers.length; i++) {
    threshold += parseFloat(weathers[i].probability);
    if (threshold > args) {
      return weathers[i];
    }
  }
};

const simulateTerrain = (args) => terrains[Math.floor(args * terrains.length)];

/**
 * update the pace from trail.js via POST
 * @param {string} req pace id
 * @param {json} res updated pace, or 200 if the same
 */
const updatePace = (req, res) => {
  gameStats.pace = paces[req.params.id];
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.pace);
};

const newProfession = (req, res) => {
  gameStats.profession = req.params.profession;
  gameStats.money = assignMoney(req.params.profession);
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.profession);
};

const assignMoney = (args) => {
  if (args === "Banker") {
    return 2000;
  } else if (args === "Carpenter") {
    return 1800;
  } else if (args === "Farmer") {
    return 1500;
  }
};

const newMembers = (req, res) => {
  gameStats.playerNames[1] = req.params.name2;
  gameStats.playerNames[2] = req.params.name3;
  gameStats.playerNames[3] = req.params.name4;
  gameStats.playerNames[4] = req.params.name5;
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.playerNames);
};

const newLeader = (req, res) => {
  gameStats.playerNames[0] = req.params.name;
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.playerNames[0]);
};

const newMonth = (req, res) => {
  gameStats.startMonth = req.params.month;
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.startMonth);
};

/**
 * call all local methods above and send them to oregontrail.js
 * @param {*} req null
 * @param {json} res gameStats object
 */
const advanceDay = (req, res) => {
  
  if (!alive(health())) return;

  const randN = Math.random();

  // call weather and terrain options first!
  gameStats.daysOnTrail++;
  gameStats.weather = simulateWeather(randN);
  gameStats.terrain = simulateTerrain(randN);
  gameStats.milesTraveled = updateMiles();
  gameStats.groupHealth = updateHealth();
  res.setHeader("Content-Type", "application/json");
  res.send(gameStats);
};

/**
 * Send all game data to client side
 * @param {*} req null
 * @param {json} res gameData object
 */
const getGameData = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(gameStats);
};

module.exports = {
  getGameData,
  advanceDay,
  newMonth,
  newMembers,
  newLeader,
  updatePace,
  newProfession,
  resetGame,
};
