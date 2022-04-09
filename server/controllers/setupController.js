var gameController = require('../controllers/gameController');
var gameData = require('../models/gameData');
var gameStats = gameData.gameInfo();

exports.createGameObject = function () {
  var newGame = gameController.getData();
  return newGame;
}

exports.startGameScreens = [];

var startGame1 = 
  "<p>Many kinds of people made the trip trip to Oregon.</p>"
  + "<p>You may:</p>"
  + "<ol id=\"setupQuestions1\" >"
  + "<li id=\"bankerMenuItem\">Be a banker from Boston</li>"
  + "<li id=\"carpenterMenuItem\">Be a carpenter from Ohio</li>"
  + "<li id=\"farmerMenuItem\">Be a farmer from Illinois</li>"
  + "<li id=\"differencesMenuItem\">Find out the differences between the choices</li>"
  + "</ol>"
  + "<div id=\"selectedOption\">What is your choice?</div>";

var startGame2 = 
  "<p>What is the first name of the wagon leader?</p>"
  + "Leader Name: <input type=\"text\" value = 'leader name'  id=\"player0\" value=\"\"/>"
  + "<input type=\"button\" class=\"button-1\" id=\"page1sub\" value=\"next\" onclick = saveWagonLeader() />";

var startGame3 = 
  "<p>What are the first names of the other members of your party?</p>"
  + "Player Name: <input value = 'player 1' id=\"player1\" /><br />"
  + "Player Name: <input value = 'player 2' id=\"player2\" /><br />"
  + "Player Name: <input value = 'player 3' id=\"player3\" /><br />"
  + "Player Name: <input value = 'player 4' id=\"player4\" /><br />"
  + "<input type=\"button\" class=\"button-1\" id=\"page2sub\" value=\"Next\" onclick = saveWagonMembers() />";

var startGame4 = 
  "<p>Choose your start month:.</p>"
  + "<ol id=\"setupQuestions4\" >"
  + "<li id=\"marchOption\">March</li>"
  + "<li id=\"aprilOption\">April</li>"
  + "<li id=\"mayOption\">May</li>"
  + "<li id=\"juneOption\">June</li>"
  + "<li id=\"julyOption\">July</li>"
  + "</ol>"
  + "<div id=\"selectedOption\">What is your choice?</div>";

var startGame5 = 
    "<p>Congratulations! You are ready to start the mission</p>"
    + "<p>Here are settings you selected for the game</p>"
    + "<div id=\"returnData\">"
    + "<span id=\"rPlayer1Name\"></span>"
    + "<span id=\"rPlayer2Name\"></span>"
    + "<span id=\"rPlayer3Name\"></span>"
    + "<span id=\"rPlayer4Name\"></span>"
    + "<span id=\"rProfession\"></span>"
    + "<span id=\"rMoney\"></span>"
    + "<span id=\"rMonth\"></span><br />"
    + "<h2 id=\"pressSpace\">Press the space to go to trail.</h2>"
    + "</div>";

    
//possibly add all to array then push array
exports.startGameScreens.push(startGame1);
exports.startGameScreens.push(startGame2);
exports.startGameScreens.push(startGame3);
exports.startGameScreens.push(startGame4);
exports.startGameScreens.push(startGame5);


exports.getGameScreen = function(req, res){
  var gameScreen = exports.startGameScreens[req.params.id];
  res.setHeader('Content-Type', 'application/json');
  res.send(gameScreen);
};