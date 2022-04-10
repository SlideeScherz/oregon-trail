const terrainModel = require('../models/terrain');
const gameDataModel = require('../models/gameData');
const paceModel = require('../models/pace');
const weatherModel = require('../models/weather');

//create gamestats object 
var gameStats = gameDataModel.gameInfo({}, {}, {}, [], [], [], "", 0, "", 0, 100, 0);
const paces = paceModel.getPaces();
const terrains = terrainModel.getTerrain();
const weathers = weatherModel.getWeather();

//function to get a random int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//method to chose a random weather using a random math int
//returns one object from array
function simulateWeather() {

  //select a value based on weather probability
  var winner = Math.random();
  var threshold = 0;
  for (let i = 0; i < weathers.length; i++) {
    threshold += parseFloat(weathers[i].probability);
    if (threshold > winner) {
      return weathers[i];
    }
  }
}

function simulateTerrain() {
  return terrains[getRandomInt(terrains.length)];
}

//grouphealth is created in the gamedata object. we simply manipulate it here
//TODO: have each updates obj be passed into here!
function updateHealth() {

  var health = gameStats.groupHealth;

  //health effect
  health += gameStats.currentWeather.healthEffect;
  health += gameStats.currentPace.healthEffect;

  return health;
}

//err here fix
//error starts with terrain
function distance() {

  //adjust mileage for other vars
  var speed = gameStats.currentPace.mileage;
  var miles = gameStats.milesTraveled;

  //if gameStats.currentPace is resting, you didnt travel anywhere.
  if (speed === 0) {
    return gameStats.milesTraveled;
  }
  else {
    speed *= gameStats.currentWeather.mileEffect;
    miles += speed;
    return miles;
  }
}

// check status of players and add messeges
function updateMesseges() {

  if (gameStats.groupHealth > 80) {
    gameStats.messages.push("Your team is healthy! Proceed on!");
  }
  else if (gameStats.groupHealth > 50){
    gameStats.messages.push(`player has died`);
  } 
  else if (gameStats.groupHealth > 20){
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

  gameStats.startMonth = null;
  gameStats.currentWeather = weathers[2];
  gameStats.currentTerrain = terrains[0];
  gameStats.playerProfession = '';
  gameStats.groupHealth = 100;
  gameStats.milesTraveled = 0;
  gameStats.currentPace = paces[3];
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats);

  console.log(`Game Reset`);
}

exports.setCurrentPace = function (req, res){
  gameStats.currentPace = paces[req.params.id];
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats.currentPace);
}

//gameStats.milesTraveled export with express
exports.getTraveledMiles = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats.milesTraveled);
}

//export weather
//from update game below
exports.getCurrentWeathers = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats.currentWeather);
}

//push data 
exports.getCurrentTerrains = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats.currentTerrain);
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
  res.send(gameStats.playerProfession);
}

// TODO: move to setup controller
exports.setMembers = function (req, res) {
  gameStats.playerNames[1] = req.params.name2;
  gameStats.playerNames[2] = req.params.name3;
  gameStats.playerNames[3] = req.params.name4;
  gameStats.playerNames[4] = req.params.name5;
  res.setHeader('Content-Type', 'text/plain');
  res.send(gameStats.playerNames);
}

// TODO: move to setup controller
exports.setLeader = function (req, res) {
  gameStats.playerNames[0] = req.params.name1;
  res.setHeader('Content-Type', 'text/plain');
  res.send(gameStats.playerNames);
}

// BUG ===========================================
// TODO: move to setup controller
exports.setMonth = function (req, res) {
  gameStats.startMonth = req.params.startMonth;
  res.setHeader('Content-Type', 'text/plain');
  res.send(gameStats.startMonth);
}

exports.updateGameData = function (req, res) {

  // call all local methods above and send them to oregontrail.js
  // we must call weather and terrain options first before we call anything else
  gameStats.daysOnTrail++;
  gameStats.currentWeather = simulateWeather();
  gameStats.currentTerrain = simulateTerrain();
  gameStats.milesTraveled = distance();
  gameStats.groupHealth = updateHealth();
  updateMesseges();
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats)
}

// send gameStats to oregonTrail.js
exports.getGameData = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats);
}