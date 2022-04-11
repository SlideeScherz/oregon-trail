const express = require('express');
const app = express();
const setupController = require('./controllers/setupController');
const gameController = require('./controllers/gameController');
//const bodyParser = require('body-parser');

// required to parse the body of a post request
//app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static('./client/public'));

const PORT = 1337;

// serve HTML pages
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: './client/views' })
});
app.get('/mainmenu', function (req, res) {
  res.sendFile('mainmenu.html', { root: './client/views' })
});
app.get('/setup', function (req, res) {
  res.sendFile('setup.html', { root: './client/views' })
});
app.get('/trail', function (req, res) {
  res.sendFile('trail.html', { root: './client/views' })
});

/** setup routes */

// send json data from setupController to setup.js
app.route('/api/setup/screen/:id')
  .get(setupController.getGameScreen);

/** game routes */

// fetch gameData from server
app.route('/api/game/data')
  .get(gameController.getGameData);

// simulate all game components and send updates data to trail.js
app.route('/api/game/advanceDay')
  .get(gameController.advanceDay);

app.route('/api/game/data/pace/:id')
  .post(gameController.setCurrentPace);

// reset game from client
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
  .post(gameController.setMonth)

// deploy server
app.listen(PORT, err => {
  if (err) return console.log(`${err} Cannot Listen on PORT: ${PORT}`);
  console.log(`Server is Listening on: http://localhost:${PORT}/`);
});
