//gather all objects from other folders in model directory and load and update game logic here
//this is where the gameStats object is birthed
//gameData here, converted to gamestats


//import models
var pace = require('../models/pace');
var weather = require('../models/weather');
var terrain = require('../models/terrain');

//create a gamedata class
//pace, weather and terrain are not 'read' yet but will be upon export below in the gameInfo object
class gameData {
  constructor(currentPace, currentWeather, currentTerrain, messages, playerNames, playerStatus,
    playerProfession, playerMoney, startMonth,
    milesTraveled, groupHealth, daysOnTrail) {


    //populate instances with DEFAULT values
    this.currentPace = currentPace;
    this.currentWeather = currentWeather;
    this.currentTerrain = currentTerrain;
    this.messages = messages;
    this.playerNames = playerNames
    this.playerStatus = playerStatus
    this.playerProfession = playerProfession;
    this.playerMoney = playerMoney;
    this.startMonth = startMonth;
    this.milesTraveled = milesTraveled
    this.groupHealth = groupHealth;
    this.daysOnTrail = daysOnTrail;
  }
}


//export the data here. we will call it via gameInfo
exports.gameInfo = function (currentPace, currentWeather, currentTerrain,
  messages, playerNames, playerStatus,
  playerProfession, playerMoney, startMonth,
  milesTraveled, groupHealth, daysOnTrail) {

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