const gameData = require('../models/gameData');
const SetupData = require('../models/setup/setupData');

// hack: cycles thru array
var weatherIndex;

// import models
var gameStats = gameData.getGameStats(SetupData);

// containers
const paces = gameData.paces;
const terrains = gameData.terrains;
const weathers = gameData.weathers;

// game logic
const MAX_DAYS_ON_TRAIL = 45;

// reset all to null
const resetGame = (req, res) => {
  if (gameStats.daysOnTrail === 0) {
    console.warn(`0 days`);
  }

  if (gameStats.hasGameBegan) {
    console.log('game is being played');
  } else {
    console.log('game is NOT being played');
  }

  console.log('Game reset');
  gameStats = gameData.getGameStats(SetupData);
  weatherIndex = 0;

  if (gameStats.daysOnTrail !== 0) {
    console.error('Days !== 0');
  }

  console.log(JSON.stringify(gameStats));
  res.setHeader('Content-Type', 'application/json');
  res.json(gameStats);
};

const randomInt = () => Math.random();

const updateMiles = () => {
  if (!gameStats.weather || !gameStats.pace) {
    console.error('Missing required values');
    return gameStats.milesTraveled;
  }

  const weatherSpeedEffect = gameStats.weather.mileEffect;
  const paceSpeedEffect = gameStats.pace.mileage;
  const netSpeedEffect = weatherSpeedEffect * paceSpeedEffect;
  return gameStats.milesTraveled + netSpeedEffect;
};

const updateHealth = () => {
  if (!gameStats.weather || !gameStats.pace) {
    console.error('Missing required values');
    return 404;
  }
  const health = gameStats.groupHealth;
  const paceHealthEffect = gameStats.pace.healthEffect;
  const weatherHealthEffect = gameStats.weather.healthEffect;
  const netHealthEffect = paceHealthEffect + weatherHealthEffect;
  return health + netHealthEffect;
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
  if (req.params.id < 0 || req.params.id > 3) {
    console.error('Illegal param. Providing default');
    gameStats.pace = paces[0];
  }
  // no exception
  else {
    gameStats.pace = paces[req.params.id];
  }

  res.setHeader('Content-Type', 'application/json');
  res.json(gameStats.pace);
};

/**
 * call all local methods above and send them to oregontrail.js
 * @param {*} req null
 * @param {json} res gameStats object
 */
const advanceDay = (req, res) => {
  //console.log(gameStats);

  if (gameStats.groupHealth <= 0) {
    console.warn('All players have died');
    gameStats.groupHealth = 0;
    gameStats.messages.push('All players have died. Game over');
    res.setHeader('Content-Type', 'application/json');
    res.send(gameStats);
    return;
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
  gameStats.terrain = simulateTerrain(randomInt());
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

module.exports = { getGameData, advanceDay, updatePace, resetGame };
