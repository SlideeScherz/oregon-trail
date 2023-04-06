const GameData = require('../models/gameData');
const SetupData = require('../models/setup/setupData');

// containers
const paces = GameData.paces;
const terrains = GameData.terrains;
const weathers = GameData.weathers;

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
  if (GameData.stats.daysOnTrail === 0) {
    console.warn(`0 days`);
  }

  if (GameData.stats.hasGameBegan) {
    console.log('game is being played');
  } else {
    console.log('game is NOT being played');
  }

  console.log('Game reset');

  if (GameData.stats.daysOnTrail !== 0) {
    console.error('Days !== 0');
  }

  console.log(JSON.stringify(GameData.stats));
  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.json(GameData.stats);
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
    GameData.stats.messages.push('Winter is coming! We are running out of time');
  }

  // health warning
  else if (data.groupHealth === 50) {
    GameData.stats.messages.push('We may need to rest. We are losing health');
  }

  // health warning
  else if (data.groupHealth === 25) {
    GameData.stats.messages.push('Our group is weak. Please let there be good weather ahead...');
  }

  // distance msgs.
  // 1/3rd
  else if (data.milesTraveled >= 156 && data.milesTraveled <= 176 && GameData.distanceMessages.length === 3) {
    const msg = GameData.distanceMessages.shift();
    GameData.stats.messages.push(msg);
  }

  // 1/2 way
  else if (data.milesTraveled >= 240 && data.milesTraveled <= 260 && GameData.distanceMessages.length === 2) {
    const msg = GameData.distanceMessages.shift();
    GameData.stats.messages.push(msg);
  }

  // 2/3 way
  else if (data.milesTraveled >= 320 && data.milesTraveled <= 340 && GameData.distanceMessages.length === 1) {
    const msg = GameData.distanceMessages.shift();
    GameData.stats.messages.push(msg);
  }
};

/**
 * update the pace from trail.js via POST
 * @param {string} req pace id
 * @param {json} res updated pace, or 200 if the same
 */
const updatePace = (req, res) => {
  GameData.stats.pace = paces[req.params.id];
  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.json(GameData.stats.pace);
};

/**
 * call all local methods above and send them to oregontrail.js
 * @param {*} req null
 * @param {json} res gameStats object
 */
const advanceDay = (req, res) => {
  if (!GameData.stats.hasGameBegan) {
    console.log('Start');
    GameData.stats.messages.push('Good luck!');
    GameData.stats.hasGameBegan = true;
  }

  // only get updates for an active game
  if (GameData.stats.gameState === GameState.Playing) {
    GameData.stats.daysOnTrail++;

    // call weather and terrain options first!
    GameData.stats.weather = simulateWeather();
    GameData.stats.terrain = simulateTerrain(randomInt());
    GameData.stats.milesTraveled = updateMiles(GameData.stats);
    GameData.stats.groupHealth = updateHealth(GameData.stats);
    GameData.stats.gameState = getGameState(GameData.stats);
    updateMessages(GameData.stats);
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(201);
  res.send(GameData.stats);
};

/**
 * Send all game data to client side
 * @param {*} req null
 * @param {json} res gameData object
 */
const getGameData = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(GameData.stats);
};

module.exports = { getGameData, advanceDay, updatePace, resetGame, simulateWeather };
