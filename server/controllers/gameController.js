const gameData = require("../models/gameData");

// import models
var gameStats = gameData.gameDataObj;

// containers
const paces = gameData.paces;
const terrains = gameData.terrains;
const weathers = gameData.weathers;

// reset all to null
const resetGame = (req, res) => {
  gameStats = gameData.defaultGameDataObj;
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats);
};

// util

// random number
const rNum = () => Math.random();

// speed and distance
const miles = () => gameStats.milesTraveled;

const pSpeed = () => gameStats.pace.mileage;

const wSpeed = () => gameStats.weather.mileEffect;

const speedEff = (arg1, arg2) => arg1 * arg2;

const updateMiles = () => miles() + speedEff(pSpeed(), wSpeed());

// health
const alive = (args) => args > 0;

const health = () => gameStats.groupHealth;

const pHealth = () => gameStats.pace.healthEffect;

const wHealth = () => gameStats.weather.healthEffect;

const healthEff = (arg1, arg2) => arg1 + arg2;

const updateHealth = () => health() + healthEff(pHealth(), wHealth());

/**
 * Get a random result with weighted odds
 * @param {number} n random integer
 * @returns {weather} new weather obj-
 */
const simulateWeather = (n) => weathers.find((el) => el.probability >= n);

/**
 * Randomly pick without probability
 * @param {number} n random integer
 * @returns {terrain} new terrain
 */
const simulateTerrain = (n) => terrains[Math.floor(n * terrains.length)];

/**
 * update the pace from trail.js via POST
 * @param {string} req pace id
 * @param {json} res updated pace, or 200 if the same
 */
const updatePace = (req, res) => {
  gameStats.pace = paces[req.params.id];
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.pace);
};

const newProfession = (req, res) => {
  gameStats.profession = req.params.profession;
  gameStats.money = assignMoney(req.params.profession);
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.profession);
};

const assignMoney = (args) => {
  if (args === "Banker") return 2000;
  else if (args === "Carpenter") return 1800;
  else if (args === "Farmer") return 1500;
};

const newMembers = (req, res) => {
  gameStats.playerNames[1] = req.params.name2;
  gameStats.playerNames[2] = req.params.name3;
  gameStats.playerNames[3] = req.params.name4;
  gameStats.playerNames[4] = req.params.name5;
  res.setHeader("Content-Type", "application/json");
  res.json(gameStats.playerNames);
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
  if (!alive(health())) return;

  // call weather and terrain options first!
  gameStats.daysOnTrail++;
  gameStats.weather = simulateWeather(rNum());
  gameStats.terrain = simulateTerrain(rNum());
  gameStats.milesTraveled = updateMiles();
  gameStats.groupHealth = updateHealth();
  res.setHeader("Content-Type", "application/json");
  res.send(gameStats);
};

/**
 * Send all game data to client side
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
