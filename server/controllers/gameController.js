//require is the javascript version of import or include in cpp
//use require to add the correct data to the gane controller 
//use api to return day reset, and change of gameStats.currentPace

//may need these lol
var terrain = require('../models/terrain');
var gameStatsImport = require('../models/gameData');
var topTen = require('../models/topTen');
var paceImport = require('../models/pace');
var weatherImport = require('../models/weather');

//create gamestats object 
var gameStats = gameStatsImport.gameInfo(0, weatherImport.defaultWeather, terrain.defaultTerrain, [], [], [], "", 0, "", 0, 100, 0);


//exported via method above
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
  if (gameStats.currentPace.paceMileage == 0) {

    console.log(gameStats.currentPace.paceMileage);

    return gameStats.milesTraveled;
  }

  else {
    //adjust mileage for other vars
    var speed = gameStats.currentPace.paceMileage;
    var miles = gameStats.milesTraveled;

    speed += (gameStats.currentTerrain.terrainMilesEffect + gameStats.currentWeather.weatherMiles);

    //update miles traveled
    miles += speed;

    console.log(gameStats.currentPace.paceMileage);

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

  else if (gameStats.groupHealth > 80) {

    gameStats.messages.unshift("Your team is healthy! Proceed on!");
  }

  else if ((gameStats.groupHealth >= 20) && (gameStats.groupHealth < 50)) {
    gameStats.playerStatus[randomInt] = false;
    gameStats.messages.unshift(randomPlayer + " has died");

  } 
  
  else if ((gameStats.groupHealth > 0) && (gameStats.groupHealth < 20)) {
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

  gameStats.startMonth = 'default month';
  gameStats.currentWeather = weatherImport.defaultWeather;
  gameStats.currentTerrain = terrain.defaultTerrain;
  gameStats.playerProfession = "default profession"
  gameStats.groupHealth = 100;
  gameStats.milesTraveled = 0;
  gameStats.currentPace = paceImport.paceOptions()[0];
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats);
  console.log("Restting Game");
  console.log(gameStats);
}

//gameStats.milesTraveled export with express
exports.getTraveledMiles = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats.milesTraveled);
}

//gameStats.currentPace export with express
exports.getCurrentPaces = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats.currentPace);
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

//===setup data=======//
exports.pickProfession = function (req, res) {
  gameStats.playerProfession = req.params.profession;
  if (gameStats.playerProfession == "Banker") {
    gameStats.playerMoney = 2000;
  }
  else if (gameStats.playerProfession == "Carpenter") {
    gameStats.playerMoney = 1800;
  }
  else if (gameStats.playerProfession == "Farmer") {
    gameStats.playerMoney = 1500;
  }

  res.setHeader('Content-Type', 'text/plain');
  res.send(gameStats.playerProfession);
}


exports.setMembers = function (req, res) {
  gameStats.playerNames[1] = req.params.name1;
  gameStats.playerNames[2] = req.params.name2;
  gameStats.playerNames[3] = req.params.name3;
  gameStats.playerNames[4] = req.params.name4;
  res.setHeader('Content-Type', 'text/plain');
  res.send(gameStats.playerNames);
}


exports.setLeader = function (req, res) {
  gameStats.playerNames[0] = req.params.name1;
  res.setHeader('Content-Type', 'text/plain');
  res.send(gameStats.playerNames);
}

//not working
exports.setMonth = function (req, res) {
  gameStats.startMonth = req.params.startMonth;
  res.setHeader('Content-Type', 'text/plain');
  res.send(gameStats.startMonth);
}

exports.setPace = function (req, res) {
  var allPaces = paceImport.paceOptions();
  gameStats.currentPace = allPaces[req.params.paceid];
  res.setHeader('Content-Type', 'text/plain');
  res.send(gameStats.currentPace);
}

//add gameStats.milesTraveled to this?
//THIS IS THE BUG

//add terrain list 
//THIS IS THE BUG THIS API DOESNT WORK
//=================================================================
exports.updateGameData = function (req, res) {

  //call all local methods above and send them to oregontrail.js
  //we must call weather and terrain options first before we call anything else
  gameStats.daysOnTrail++;
  gameStats.currentWeather = simulateWeather();
  gameStats.currentTerrain = simulateTerrain();
  gameStats.milesTraveled = distance();
  gameStats.groupHealth = updateHealth();
  updateMesseges();
  //gameStats.playerStatus = updatePlayerStatus();
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats)
}

//send gameStats to oregonTrail.js
exports.getGameData = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(gameStats);
  return (gameStats);
}

//send game data to setup controller
//not a json might ba an issue
exports.getData = function () {
  return gameStats;
}