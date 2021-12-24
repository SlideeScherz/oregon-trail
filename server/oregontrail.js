const express = require('express')
const app = express()
app.use(express.static('./client/public'));
const port = 1337

//include views
app.get('/', function (req, res) { res.sendFile('index.html', {root: './client/views' })
})
app.get('/mainmenu', function (req, res) { res.sendFile('mainmenu.html', {root: './client/views' })
})
app.get('/topten', function (req, res) { res.sendFile('topten.html', {root: './client/views' })
})
app.get('/setup', function (req, res) { res.sendFile('setup.html', {root: './client/views' })
})
app.get('/trail', function (req, res) { res.sendFile('trail.html', {root: './client/views' })
})
app.get('/obi-wanApproaches', function (req, res) { res.sendFile('obi-wanApproaches.html', {root: './client/views' })
})
app.get('/befreindObi-wan', function (req, res) { res.sendFile('befreindObi-wan.html', {root: './client/views' })
})
app.get('/fightObi-wan', function (req, res) { res.sendFile('fightObi-wan.html', {root: './client/views' })
})

//impoert data for controllers
var topTenontroller = require('./controllers/topTenController');
var setupController = require('./controllers/setupController');
var gameController = require('./controllers/gameController');

//api routes
app.route('/api/topTen')
  .get(topTenontroller.getCurrentScores)
  .post(topTenontroller.saveCurrentScores)

app.route('/api/topTen/:topTenId')
  .delete(topTenontroller.deleteCurrentScores)
  .patch(topTenontroller.updateCurrentScores)

app.route('/api/pace/:paceid?')
  .get(gameController.getCurrentPaces)
  .post(gameController.setPace)

//pull game data from game controller
//for setup and trail
app.route('/api/game/data')
  .get(gameController.getGameData);

app.route('/api/game/updateGame')
  .get(gameController.updateGameData);

app.route('/api/game/reset')
  .get(gameController.resetGame);

//send setup info to game controller
app.route('/api/setup/wagonLeader/:name1')
  .post(gameController.setLeader);

app.route('/api/setup/member/:name2/:name3/:name4/:name5')
  .post(gameController.setMembers);

app.route('/api/setup/profession/:profession')
  .post(gameController.pickProfession);

app.route('/api/setup/month/:month')
  .post(gameController.setMonth);

app.route('/api/setup/screen/:id')
  .get(setupController.getGameScreen);

//deploy server
//port should be 1337 
app.listen(port, () => {
  console.log(`Oregon Trail listening at http://localhost:${port}`)
})
