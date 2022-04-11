const terrainModel = require('../models/terrain');
const gameDataModel = require('../models/gameData');
const paceModel = require('../models/pace');
const weatherModel = require('../models/weather');

//create gamestats object 
var gameStats = gameDataModel.getGameDataModel();
const paces = paceModel.getPaces();
const terrains = terrainModel.getTerrain();
const weathers = weatherModel.getWeather();

/**
 * Pick a weather based on probability
 * @returns new weather
 */
function simulateWeather(randomFloat) {

  var threshold = 0;

  for (let i = 0; i < weathers.length; i++) {
    threshold += parseFloat(weathers[i].probability);
    if (threshold > randomFloat) {
      return weathers[i];
    }
  }
}

/**
 * Pick a random terrain with no probability
 * @returns new terrain
 */
function simulateTerrain(randomFloat) {
  return terrains[Math.floor(randomFloat * (terrains.length))];
}

/**
 * Update health based on the current gameData
 * TODO: Read the halth, and decide if a player should die
 * @param {number} speedEffect gameData.currentPace.healthEffect
 * @param {number} weatherEffect gameData.currentWeather.healthEffect
 * @returns new group health
 */
function updateHealth(currentHealth, speedEffect, weatherEffect) {

  // avoid a negative health
  if (currentHealth <= 0) {
    return 0;
  }

  return currentHealth += (weatherEffect + speedEffect);
}

/**
 * Update the miles traveled reading from gameData object
 * @param {number} mileProgress gameStats.milesTravelled
 * @param {number} speed gameStats.currentPace.mileage
 * @returns {number} new milesTraveled
 */
function updateDistance(mileProgress, speed, weatherEffect) {

  // if gameStats.currentPace is resting, you didnt travel anywhere.
  if (speed === 0) {
    return mileProgress;
  }
  return mileProgress += (speed * weatherEffect);
}

// check status of players and add messeges
function updateMesseges() {

  if (gameStats.groupHealth > 80) {
    gameStats.messages.push("Your team is healthy! Proceed on!");
  }
  else if (gameStats.groupHealth > 50) {
    gameStats.messages.push(`player has died`);
  }
  else if (gameStats.groupHealth > 20) {
    gameStats.messages.push(`player has died`);
  }
  else if (gameStats.groupHealth <= 0) {
    gameStats.messages.push("all players have died. Game Over");
  }
  else {
    gameStats.messages.push("Press Space to advance day!");
  }
}

//major errrors thrown at start of game fix this first 
//we may not need this now that we have a better constuctos for most values
exports.resetGame = function (req, res) {

  console.log(`Resetting Game`);

  gameStats.startMonth = null;
  gameStats.currentWeather = weathers[2];
  gameStats.currentTerrain = terrains[0];
  gameStats.playerProfession = '';
  gameStats.groupHealth = 100;
  gameStats.milesTraveled = 0;
  gameStats.currentPace = paces[3];
  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(200);
}

/**
 * update the pace from trail.js via POST
 * @param {string} req name of pace 
 * @param {json} res currentPace
 */
exports.setCurrentPace = function (req, res) {
  gameStats.currentPace = paces[req.params.id];
  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(200);
}

/**
 * called from setup.js
 * @param {*} req profession plain text 
 * @param {*} res 
 */
exports.pickProfession = function (req, res) {
  gameStats.playerProfession = req.params.profession;
  if (gameStats.playerProfession === "Banker") {
    gameStats.playerMoney = 2000;
  }
  else if (gameStats.playerProfession === "Carpenter") {
    gameStats.playerMoney = 1800;
  }
  else if (gameStats.playerProfession === "Farmer") {
    gameStats.playerMoney = 1500;
  }
  res.setHeader('Content-Type', 'text/plain');
  res.sendStatus(200);
}

// receive gamedata from setup.js
exports.setMembers = function (req, res) {
  gameStats.playerNames[1] = req.params.name2;
  gameStats.playerNames[2] = req.params.name3;
  gameStats.playerNames[3] = req.params.name4;
  gameStats.playerNames[4] = req.params.name5;
  res.setHeader('Content-Type', 'text/plain');
  res.sendStatus(200);
}

// receive gamedata from setup.js
exports.setLeader = function (req, res) {
  gameStats.playerNames[0] = req.params.name1;
  res.setHeader('Content-Type', 'text/plain');
  res.sendStatus(200);
}

// receive gamedata from setup.js
exports.setMonth = function (req, res) {
  gameStats.startMonth = req.params.month;
  res.setHeader('Content-Type', 'text/plain');
  res.sendStatus(200);
}

/**
 * call all local methods above and send them to oregontrail.js
 * @param {*} req null 
 * @param {json} res gameStats object
 */
exports.advanceDay = function (req, res) {

  //TODO: add checkStatus
  //first check status. If people are alive procees
  if(gameStats.groupHealth <= 0){
    return;
  }
  else{
    var tempRandomFloat = Math.random();

    // call weather and terrain options first!
    gameStats.daysOnTrail++;
    gameStats.currentWeather = simulateWeather(tempRandomFloat);
    gameStats.currentTerrain = simulateTerrain(tempRandomFloat);
    gameStats.milesTraveled = updateDistance(gameStats.milesTraveled, gameStats.currentPace.mileage, gameStats.currentWeather.mileEffect);
    gameStats.groupHealth = updateHealth(gameStats.groupHealth, gameStats.currentPace.healthEffect, gameStats.currentWeather.healthEffect);
    updateMesseges();
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(200);
}

// send gameStats to oregonTrail.js
exports.getGameData = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats);
}