const terrainImport = require('../models/terrain');
const stats = require('../models/gameData');
const paceModel = require('../models/pace');
const weatherImport = require('../models/weather');

//create gamestats object 
var gameStats = stats.gameInfo({}, {}, {}, [], [], [], "", 0, "", 0, 100, 0);
const paces = paceModel.getPaces();

//TODO: move to weather
//populate weather data
var weatherArray = [];
defaultWeather = weatherImport.weatherOptions(0, "default", 0, 0, 0);
currentWeather1 = weatherImport.weatherOptions(1, "Very Hot", -8, .7, .1);
currentWeather2 = weatherImport.weatherOptions(2, "Hot", -3, .9, .1);
currentWeather3 = weatherImport.weatherOptions(3, "Warm", +1, 1, .2);
currentWeather4 = weatherImport.weatherOptions(4, "Cool", +1, .95, .1);
currentWeather5 = weatherImport.weatherOptions(5, "Cold", -5, .8, .1);
currentWeather6 = weatherImport.weatherOptions(6, "Very Cold", -12, .7, .1);
currentWeather7 = weatherImport.weatherOptions(7, "Rain", -4, .6, .1);
currentWeather8 = weatherImport.weatherOptions(8, "Heavy Rain", -8, .4, .05);
currentWeather9 = weatherImport.weatherOptions(9, "Snow", -15, .3, .05);
currentWeather10 = weatherImport.weatherOptions(10, "Blizzard", -30, .1, .05);
currentWeather11 = weatherImport.weatherOptions(11, "Heavy Fog", -3, .5, .05);

weatherArray.push(currentWeather1);
weatherArray.push(currentWeather2);
weatherArray.push(currentWeather3);
weatherArray.push(currentWeather4);
weatherArray.push(currentWeather5);
weatherArray.push(currentWeather6);
weatherArray.push(currentWeather7);
weatherArray.push(currentWeather8);
weatherArray.push(currentWeather9);
weatherArray.push(currentWeather10);
weatherArray.push(currentWeather11);

var terrainArray = [];
defaultTerrain = terrainImport.terrainOptions("Start Game to select a terrain", "<img src=\"/images/goodLuckMsg.png\" width=\"200px\" height=\"200px\">", -5);
currentTerrain1 = terrainImport.terrainOptions("Mountains", "<img src=\"/images/mountains.jpeg\" width=\"200px\" height=\"200px\">", -5);
currentTerrain2 = terrainImport.terrainOptions("Grassland", "<img src=\"/images/grassland.jpeg\" width=\"200px\" height=\"200px\">", +5);
currentTerrain3 = terrainImport.terrainOptions("Plains", "<img src=\"/images/plains.jpeg\" width=\"200px\" height=\"200px\">", +5);
currentTerrain4 = terrainImport.terrainOptions("Forrest", "<img src=\"/images/forrest.jpeg\" width=\"200px\" height=\"200px\">", 0);
currentTerrain5 = terrainImport.terrainOptions("Desert", "<img src=\"/images/desert.jpeg\"width=\"200px\" height=\"200px\">", -5);

terrainArray.push(currentTerrain1);
terrainArray.push(currentTerrain2);
terrainArray.push(currentTerrain3);
terrainArray.push(currentTerrain4);
terrainArray.push(currentTerrain5);

//error handeling if something loads null upon game start 
if (gameStats.groupHealth == null || gameStats.groupHealth == undefined) {
  gameStats.groupHealth = 100
}

if (gameStats.milesTraveled == null || gameStats.milesTraveled == undefined) {
  gameStats.milesTraveled = 0;
}

if (gameStats.currentTerrain.terrainMilesEffect == undefined) {
  gameStats.currentTerrain.terrainMilesEffect = 0.5;
  console.log("terrainMilesEffect was undef! Fixed")
}


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
  for (let i = 0; i < weatherArray.length; i++) {
    threshold += parseFloat(weatherArray[i].weatherProbability);
    if (threshold > winner) {
      return weatherArray[i];
    }
  }
}

//method to chose a random terrain using a random math int
//returns one object from array
function simulateTerrain() {

  //find length of array 
  var len = terrainArray.length;

  //select a random item from array of weathers
  var i = getRandomInt(len);

  //gameStats.currentTerrain = terrainArray[i];
  return terrainArray[i];
}

//exported vis method above
//grouphealth is created in the gamedata object. we simply manipulate it here
function updateHealth() {

  var health = gameStats.groupHealth;

  //health effect
  health += gameStats.currentWeather.weatherHealth;
  health += gameStats.currentPace.paceHealth;

  return health;

}

//err here fix
//error starts with terrain
function distance() {

  //if gameStats.currentPace is resting, you didnt travel anywhere.
  if (gameStats.currentPace.mileage == 0) {
    return gameStats.milesTraveled;
  }
  else {
    //adjust mileage for other vars
    var speed = gameStats.currentPace.mileage;
    var miles = gameStats.milesTraveled;

    speed += (gameStats.currentTerrain.terrainMilesEffect + gameStats.currentWeather.weatherMiles);

    //update miles traveled
    miles += speed;

    return miles;
  }
}

//check status of players and add messeges
function updateMesseges() {

  var playersLeft = gameStats.playerNames.length;
  var randomInt = getRandomInt(playersLeft - 1);
  var randomPlayer = gameStats.playerNames[randomInt];

  if (gameStats.messeges == null || gameStats.messeges == undefined) {
    gameStats.messages.unshift("");
  }


  if (gameStats.groupHealth > 80) {

    gameStats.messages.unshift("Your team is healthy! Proceed on!");
  }

  else if ((gameStats.groupHealth >= 20) && (gameStats.groupHealth < 50)) {
    gameStats.playerStatus[randomInt] = false;
    gameStats.messages.unshift(randomPlayer + " has died");

  } else if ((gameStats.groupHealth > 0) && (gameStats.groupHealth < 20)) {
    gameStats.playerStatus[randomInt] = false;
    gameStats.messages.unshift("player " + randomPlayer + " has died");
  }
  else if (gameStats.groupHealth <= 0) {
    gameStats.messages.unshift("all players have died. Game Over");
  }
  else {
    gameStats.messages.unshift("Press Space to advance day!");

  }
}

//major errrors thrown at start of game fix this first 
//we may not need this now that we have a better constuctos for most values
exports.resetGame = function (req, res) {

  //we dont need start month to reset the game. The user will establish it in setup.js
  //create a default value for each obj
  //set all to default values here 
  //gameStats.currentPace = ;
  gameStats.startMonth = '';
  gameStats.currentWeather = defaultWeather;
  gameStats.currentTerrain = defaultTerrain;
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

// TODO: move to setup controller
// Also this is wrong. this sets the player money
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