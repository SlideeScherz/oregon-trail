const terrainModel = require("../models/terrain");
const gameDataModel = require("../models/gameData");
const paceModel = require("../models/pace");
const weatherModel = require("../models/weather");

//create gamestats object
const gameStats = gameDataModel.gameDataObj;
const paces = paceModel.pace;
const terrains = terrainModel.terrain;
const weathers = weatherModel.weather;

/**
 * Init all gameData back to default
 * @param {*} req
 * @param {*} res
 */
const resetGame = (req, res) => {
  gameStats.startMonth = null;
  gameStats.currentWeather = weathers[2];
  gameStats.currentTerrain = terrains[0];
  gameStats.playerProfession = "";
  gameStats.groupHealth = 100;
  gameStats.milesTraveled = 0;
  gameStats.currentPace = paces[3];
  res.setHeader("Content-Type", "application/json");
  res.sendStatus(200);
};

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

const updateHealth = (health, paceFx, weatherFx) => {
  return (health += weatherFx + paceFx);
};

/**
 * Update the miles traveled reading from gameData object
 * if resting, return 0
 * @param {number} miles gameStats.milesTravelled
 * @param {number} speed gameStats.currentPace.mileage
 * @param {number} weatherFx gameStats.currentWeather.weatherFx
 * @returns {number} new milesTraveled
 */
const updateDistance = (miles, speed, weatherFx) => {
  // if resting, you didnt travel anywhere.
  if (speed === 0) return miles;

  return (miles += speed * weatherFx);
};

/**
 * update the pace from trail.js via POST
 * @param {string} req name of pace
 * @param {json} res currentPace
 */
const setCurrentPace = (req, res) => {
  gameStats.currentPace = paces[req.params.id];
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.currentPace);
};

/**
 * Respond with whole obj because we also select the money
 * @param {*} req 
 * @param {*} res 
 */
const pickProfession = (req, res) => {
  gameStats.playerProfession = req.params.profession;
  gameStats.playerMoney = assignMoney(req.params.profession);
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats);
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

const setMembers = (req, res) => {
  gameStats.playerNames[1] = req.params.name2;
  gameStats.playerNames[2] = req.params.name3;
  gameStats.playerNames[3] = req.params.name4;
  gameStats.playerNames[4] = req.params.name5;
  res.setHeader("Content-Type", "application/json");
  res.sendStatus(200);
};

const setLeader = (req, res) => {
  gameStats.playerNames[0] = req.params.name;
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.playerNames[0]);
};

const setMonth = (req, res) => {
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
  //TODO: add checkStatus
  //first check status. If people are alive procees
  if (gameStats.groupHealth <= 0) {
    return;
  }

  const tempRandomFloat = Math.random();

  // call weather and terrain options first!
  gameStats.daysOnTrail++;
  gameStats.currentWeather = simulateWeather(tempRandomFloat);
  gameStats.currentTerrain = simulateTerrain(tempRandomFloat);
  gameStats.milesTraveled = updateDistance(
    gameStats.milesTraveled,
    gameStats.currentPace.mileage,
    gameStats.currentWeather.mileEffect
  );
  gameStats.groupHealth = updateHealth(
    gameStats.groupHealth,
    gameStats.currentPace.healthEffect,
    gameStats.currentWeather.healthEffect
  );
  res.setHeader("Content-Type", "application/json");
  res.send(gameStats);
};

/**
 * Send game data to client side
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
  setMonth,
  setMembers,
  setLeader,
  setCurrentPace,
  pickProfession,
  resetGame,
};
