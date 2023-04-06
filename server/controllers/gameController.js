const gameData = require('../models/gameData');
const SetupData = require('../models/setup/setupData');

// import models
var gameStats = gameData.getGameStats(SetupData.SetupData);

// containers
const paces = gameData.paces;
const terrains = gameData.terrains;
const weathers = gameData.weathers;

// game logic
const MAX_DAYS_ON_TRAIL = 50;
const MILE_GOAL = 500;

const GameState = {
  InSetup: 'InSetup',
  Playing: 'Playing',
  HealthLoss: 'HealthLoss',
  ExceededDaysLoss: 'ExceededDaysLoss',
  Win: 'Win',
};

/**
 * Get an enum response based on the current game data
 * @param {GameStats} data pass in `gameStats` object
 * @returns GameState enum value
 */
const getGameState = (data) => {
  if (data.groupHealth <= 0) {
    console.log('All players are dead');
    return GameState.HealthLoss;
  }

  // max 45 days
  else if (data.daysOnTrail > MAX_DAYS_ON_TRAIL) {
    console.log('Exceeded Days');
    return GameState.ExceededDaysLoss;
  }

  // if none have excecuted, its a win
  else if (data.milesTraveled >= MILE_GOAL) {
    console.log('Win!');
    return GameState.Win;
  }

  // none have happened, proceed
  else {
    console.log('Playing');
    return GameState.Playing;
  }
};

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
  gameStats = gameData.getGameStats(SetupData.SetupData);

  if (gameStats.daysOnTrail !== 0) {
    console.error('Days !== 0');
  }

  console.log(JSON.stringify(gameStats));
  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.json(gameStats);
};

const randomInt = () => Math.random();

const updateMiles = (data) => {
  const { weather, pace, milesTraveled } = data;
  const weatherEffect = weather.mileEffect;
  const paceEffect = pace.mileage;
  return milesTraveled + weatherEffect * paceEffect;
};

const updateHealth = (data) => {
  const { weather, pace, groupHealth } = data;
  const paceEffect = pace.healthEffect;
  const weatherEffect = weather.healthEffect;
  return groupHealth + paceEffect + weatherEffect;
};

/**
 * thanks to https://gist.github.com/alesmenzel/6164543b3d018df7bcaf6c5f9e6a841e
 * @returns Weather object based on its weight
 */
const simulateWeather = () => {
  const random = randomInt();
  const result = weathers.find((value, index) => {
    const sum = weathers.slice(0, index + 1).reduce((accumulator, weather) => {
      return accumulator + weather.probability;
    }, 0);

    return random < sum;
  });

  return result;
};

/**
 * Randomly pick without probability
 * @param {number} n random integer
 * @returns {Object} new terrain
 */
const simulateTerrain = (n) => terrains[Math.floor(n * terrains.length)];

const updateMessages = (data) => {
  if (data.daysOnTrail === MAX_DAYS_ON_TRAIL / 2) {
    gameStats.messages.push('Winter is coming! We are running out of time');
  }

  // health warning
  else if (data.groupHealth === 50) {
    gameStats.messages.push('We may need to rest. We are losing health');
  }

  // health warning
  else if (data.groupHealth === 25) {
    gameStats.messages.push('Our group is weak. Please let there be good weather ahead...');
  }

  // distance msgs.
  // 1/3rd
  else if (data.milesTraveled >= 156 && data.milesTraveled <= 176 && gameData.distanceMessages.length === 3) {
    const msg = gameData.distanceMessages.shift();
    gameStats.messages.push(msg);
  }

  // 1/2 way
  else if (data.milesTraveled >= 240 && data.milesTraveled <= 260 && gameData.distanceMessages.length === 2) {
    const msg = gameData.distanceMessages.shift();
    gameStats.messages.push(msg);
  }

  // 2/3 way
  else if (data.milesTraveled >= 320 && data.milesTraveled <= 340 && gameData.distanceMessages.length === 1) {
    const msg = gameData.distanceMessages.shift();
    gameStats.messages.push(msg);
  }
};

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
  res.status(201);
  res.json(gameStats.pace);
};

/**
 * call all local methods above and send them to oregontrail.js
 * @param {*} req null
 * @param {json} res gameStats object
 */
const advanceDay = (req, res) => {
  if (!gameStats.hasGameBegan) {
    console.log('Start');
    gameStats.messages.push('Good luck!');
    gameStats.hasGameBegan = true;
  }

  // only get updates for an active game
  if (gameStats.gameState === GameState.Playing) {
    gameStats.daysOnTrail++;

    // call weather and terrain options first!
    gameStats.weather = simulateWeather();
    gameStats.terrain = simulateTerrain(randomInt());
    gameStats.milesTraveled = updateMiles(gameStats);
    gameStats.groupHealth = updateHealth(gameStats);
    gameStats.gameState = getGameState(gameStats);
    updateMessages(gameStats);
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(201);
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
