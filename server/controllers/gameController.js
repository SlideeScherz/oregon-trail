const terrainModel = require("../models/terrain");
const gameDataModel = require("../models/gameData");
const paceModel = require("../models/pace");
const weatherModel = require("../models/weather");

//create gamestats object
const gameStats = gameDataModel.getGameDataObj();
const paces = paceModel.getPaces();
const terrains = terrainModel.getTerrain();
const weathers = weatherModel.getWeather();

/**
 * Init all gameData back to default
 * @param {*} req
 * @param {*} res
 */
const resetGame = (req, res) => {
  console.log(`Resetting Game`);

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

/**
 * Pick a weather based on probability
 * @returns new weather
 */
const simulateWeather = (randomFloat) => {
  var threshold = 0;

  for (let i = 0; i < weathers.length; i++) {
    threshold += parseFloat(weathers[i].probability);
    if (threshold > randomFloat) {
      return weathers[i];
    }
  }
};

/**
 * Pick a random terrain with no probability
 * @returns new terrain
 */
const simulateTerrain = (randomFloat) =>
  terrains[Math.floor(randomFloat * terrains.length)];

//TODO: Read the halth, and decide if a player should die
/**
 * Update health based on the current gameData
 * @param {number} paceFx gameData.currentPace.healthEffect
 * @param {number} weatherFx gameData.currentWeather.healthEffect
 * @returns new group health
 */
const updateHealth = (health, paceFx, weatherFx) =>
  (health += weatherFx + paceFx);

/**
 * Update the miles traveled reading from gameData object
 * @param {number} miles gameStats.milesTravelled
 * @param {number} speed gameStats.currentPace.mileage
 * @returns {number} new milesTraveled
 */
const updateDistance = (miles, speed, weatherFx) => {
  // if resting, you didnt travel anywhere.
  if (speed === 0) {
    return miles;
  }
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

const pickProfession = (req, res) => {
  gameStats.playerProfession = req.params.profession;
  if (gameStats.playerProfession === "Banker") {
    gameStats.playerMoney = 2000;
  } else if (gameStats.playerProfession === "Carpenter") {
    gameStats.playerMoney = 1800;
  } else if (gameStats.playerProfession === "Farmer") {
    gameStats.playerMoney = 1500;
  }
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.playerProfession);
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
  gameStats.playerNames[0] = req.params.name1;
  res.setHeader("Content-Type", "application/json");
  res.sendStatus(200);
};

const setMonth = (req, res) => {
  gameStats.startMonth = req.params.month;
  res.setHeader("Content-Type", "application/json");
  res.sendStatus(200);
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
