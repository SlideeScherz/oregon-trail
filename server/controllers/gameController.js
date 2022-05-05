const terrainModel = require("../models/terrain");
const gameDataModel = require("../models/gameData");
const paceModel = require("../models/pace");
const weatherModel = require("../models/weather");

// import models
const gameStats = gameDataModel.gameDataObj;
const paces = paceModel.pace;
const terrains = terrainModel.terrain;
const weathers = weatherModel.weather;

// reset all to null
const resetGame = (req, res) => {
  gameStats.pace = paces[3];
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
  return health + (weatherFx + paceFx);
};

/**
 * Update the miles traveled reading from gameData object
 * if resting, return 0
 * @param {number} miles gameStats.milesTravelled
 * @param {number} speed gameStats.pace.mileage
 * @param {number} weatherFx gameStats.weather.weatherFx
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
 * @param {json} res pace
 */
const updatePace = (req, res) => {
  if (gameStats.pace === paces[req.params.id]) {
    res.setHeader("Content-Type", "application/json");
    res.sendStatus(200);
    return;
  }

  gameStats.pace = paces[req.params.id];
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.pace);
};

/**
 * Respond with whole obj because we also select the money
 * @param {*} req
 * @param {*} res
 */
const newProfession = (req, res) => {
  gameStats.profession = req.params.profession;
  gameStats.money = assignMoney(req.params.profession);
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

const newMembers = (req, res) => {
  gameStats.playerNames[1] = req.params.name2;
  gameStats.playerNames[2] = req.params.name3;
  gameStats.playerNames[3] = req.params.name4;
  gameStats.playerNames[4] = req.params.name5;
  res.setHeader("Content-Type", "application/json");
  res.sendStatus(200);
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
  //TODO: add checkStatus
  //first check status. If people are alive procees
  if (gameStats.groupHealth <= 0) return;

  const randN = Math.random();

  // call weather and terrain options first!
  gameStats.daysOnTrail++;
  gameStats.weather = simulateWeather(randN);
  gameStats.terrain = simulateTerrain(randN);
  gameStats.milesTraveled = updateDistance(
    gameStats.milesTraveled,
    gameStats.pace.mileage,
    gameStats.weather.mileEffect
  );
  gameStats.groupHealth = updateHealth(
    gameStats.groupHealth,
    gameStats.pace.healthEffect,
    gameStats.weather.healthEffect
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
  newMonth,
  newMembers,
  newLeader,
  updatePace,
  newProfession,
  resetGame,
};
