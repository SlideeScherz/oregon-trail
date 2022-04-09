//gather all objects from other folders in model directory and load and update game logic here
//this is where the gameStats object is birthed
//gameData here, converted to gamestats

//create a gamedata class
//pace, weather and terrain are not 'read' yet but will be upon export below in the gameInfo object
function gameData(currentPace, currentWeather, currentTerrain, messages, playerNames, playerStatus, 
  playerProfession, playerMoney, startMonth, 
  milesTraveled, groupHealth, daysOnTrail){

//import models
var paceImport = require('../models/pace');
var weatherImport = require('../models/weather');
var terrainImport = require('../models/terrain');                

//populate instances with DEFAULT values
this.currentPace = {};
this.currentWeather = {};
this.currentTerrain = {};
this.messages = [];
this.playerNames = ["", "", "", "", ""];
this.playerStatus = [true, true, true, true, true];
this.playerProfession = "";
this.playerMoney = 0;
this.startMonth = "";
this.milesTraveled = 0;
this.groupHealth = 100;
this.daysOnTrail = 0;
}


//export the data here. we will call it via gameInfo
exports.gameInfo = function (currentPace, currentWeather, currentTerrain, 
          messages, playerNames, playerStatus, 
          playerProfession, playerMoney, startMonth, 
          milesTraveled, groupHealth, daysOnTrail){

//export this object with the default constructor variables
//keep updating this obj with the data
//create a gameInfo object, of the gameData class

//do not import these globally we only want this loaded once! not every time
//we call gamedata

//data will be sent and stored here to and from the game controller
var gameStats = new gameData(
currentPace, currentWeather, currentTerrain, messages, playerNames, playerStatus, 
playerProfession, playerMoney, startMonth, milesTraveled, groupHealth, daysOnTrail);

return gameStats;
}