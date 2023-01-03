const gameData = require('../models/gameData');

// hack: cycles thru array
var weatherIndex;

// import models
var gameStats = gameData.gameDataObj;

// containers
const paces = gameData.paces;
const terrains = gameData.terrains;
const weathers = gameData.weathers;

// reset all to null
const resetGame = (req, res) => {
  if (gameStats.hasGameBegan) {
    console.log('game is being played');
  } else {
    console.log('game is NOT being played');
  }
  console.log('Game reset');
  gameStats = gameData.defaultGameDataObj;
  weatherIndex = 0;
  res.setHeader('Content-Type', 'application/json');
  res.json(gameStats);
};

// util

// random number
const rNum = () => Math.random();

// speed and distance
const distance = () => gameStats.milesTraveled;

const paceSpeed = () => gameStats.pace.mileage;

// weather
const weatherSpeed = () => gameStats.weather.mileEffect;

// speed effect, constant args always pace and weather speed
const netSpeedEffect = () => paceSpeed() * weatherSpeed();

const updateMiles = () => distance() + netSpeedEffect();

// health
const alive = (args) => args > 0;

const health = () => gameStats.groupHealth;

const paceHealth = () => gameStats.pace.healthEffect;

const weatherHealth = () => gameStats.weather.healthEffect;

const netHealthEffect = () => paceHealth() + weatherHealth();

const updateHealth = () => {
  // handle death
  if (health() <= 0) {
    return 0;
  }
  // handle max
  else if (health() > 100) {
    return 100;
  }

  return health() + netHealthEffect();
};

/**
 * Get a random result with weighted odds
 * @returns {Object} new weather obj
 */
const simulateWeather = () => {
  if (weatherIndex >= weathers.length - 1) {
    weatherIndex = 0;
  }
  // inc
  else {
    weatherIndex++;
  }

  return weathers[weatherIndex];
};

/**
 * Randomly pick without probability
 * @param {number} n random integer
 * @returns {Object} new terrain
 */
const simulateTerrain = (n) => terrains[Math.floor(n * terrains.length)];

/**
 * update the pace from trail.js via POST
 * @param {string} req pace id
 * @param {json} res updated pace, or 200 if the same
 */
const updatePace = (req, res) => {
  gameStats.pace = paces[req.params.id];
  res.setHeader('Content-Type', 'application/json');
  res.json(gameStats.pace);
};

const newProfession = (req, res) => {
  gameStats.profession = req.params.profession;
  gameStats.money = assignMoney(req.params.profession);
  res.setHeader('Content-Type', 'application/json');
  res.json(gameStats.profession);
};

const assignMoney = (args) => {
  if (args === 'Banker') return 2000;
  else if (args === 'Carpenter') return 1800;
  else if (args === 'Farmer') return 1500;
};

const newLeader = (req, res) => {
  gameStats.playerNames[0] = req.params.name;
  res.setHeader('Content-Type', 'application/json');
  res.json(gameStats.playerNames[0]);
};

const newMembers = (req, res) => {
  gameStats.playerNames[1] = req.params.name1;
  gameStats.playerNames[2] = req.params.name2;
  gameStats.playerNames[3] = req.params.name3;
  gameStats.playerNames[4] = req.params.name4;
  res.setHeader('Content-Type', 'application/json');
  res.json(gameStats.playerNames);
};

const newMonth = (req, res) => {
  gameStats.startMonth = req.params.month;
  res.setHeader('Content-Type', 'application/json');
  res.json(gameStats.startMonth);
};

/**
 * call all local methods above and send them to oregontrail.js
 * @param {*} req null
 * @param {json} res gameStats object
 */
const advanceDay = (req, res) => {
  //console.log(gameStats);

  if (!alive(health())) {
    console.warn('All players have died');
    //return null;
  }

  if (!gameStats.hasGameBegan) {
    console.log('Start');
    gameStats.messages.push('Good luck!');
    gameStats.hasGameBegan = true;
  }

  // call weather and terrain options first!
  gameStats.daysOnTrail++;
  //gameStats.weather = simulateWeather(rNum());
  gameStats.weather = simulateWeather();
  gameStats.terrain = simulateTerrain(rNum());
  gameStats.milesTraveled = updateMiles();
  gameStats.groupHealth = updateHealth();
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats);
};

/**
 * Send all game data to client side
 * @param {*} req null
 * @param {json} res gameData object
 */
const getGameData = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
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
