const terrainModel = require("../models/terrain");
const gameDataModel = require("../models/gameData");
const paceModel = require("../models/pace");
const weatherModel = require("../models/weather");

//create gamestats object
const gameStats = gameDataModel.getGameDataObj();
const paces = paceModel.getPaces();
const terrain = terrainModel.getTerrain();
const weather = weatherModel.getWeather();

// init all gameData back to default
exports.resetGame = function (req, res) {
  gameStats.startMonth = null;
  gameStats.currentWeather = weather[2];
  gameStats.currentTerrain = terrain[0];
  gameStats.playerProfession = null;
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

  for (let i = 0; i < weather.length; i++) {
    threshold += parseFloat(weather[i].probability);
    if (threshold > randomFloat) {
      return weather[i];
    }
  }
};

/**
 * Pick a random terrain with no probability
 * @returns new terrain
 */
const simulateTerrain = (randomFloat) =>
  terrain[Math.floor(randomFloat * terrain.length)];

/**
 * Update health based on the current gameData
 * TODO: Read the halth, and decide if a player should die
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

// check status of players and add messeges
const updateMesseges = (health) => {
  
  var msg = "";

  if (health > 80) msg = "Your team is healthy! Proceed on!";
  else if (health > 50) msg = `player has died`;
  else if (health > 20) msg = `player has died`;
  else if (health <= 0) msg = "all players have died. Game Over";
  else msg = "Press Space to advance day!";

  gameStats.messages.push(msg);
};

/**
 * update the pace from trail.js via POST
 * @param {string} req name of pace
 * @param {json} res currentPace
 */
exports.setCurrentPace = function (req, res) {
  gameStats.currentPace = paces[req.params.id];
  res.setHeader("Content-Type", "application/json");
  res.sendStatus(200);
};

/**
 * call all local methods above and send them to oregontrail.js
 * @param {*} req null
 * @param {json} res gameStats object
 */
exports.advanceDay = function (req, res) {
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

  updateMesseges(gameStats.groupHealth);

  //TODO: needed?
  res.setHeader("Content-Type", "application/json");
  res.sendStatus(200);
};

// send gameStats to oregonTrail.js
exports.getGameData = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(gameStats);
};
