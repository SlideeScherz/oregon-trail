const express = require('express');
const app = express();
const setupController = require('./controllers/setupController');
const gameController = require('./controllers/gameController');

app.use(express.static('./client/public'));
const PORT = 1337;

//remove me! this is so i get pushed

// HTML pages
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

//pull game data from game controller
//for setup and trail
app.route('/api/game/data')
  .get(gameController.getGameData);

  //TODO: this is next day
app.route('/api/game/updateGame')
  .get(gameController.updateGameData);

  app.route('/api/game/data/pace/:id')
  .post(gameController.setCurrentPace);

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

app.route('/api/setup/screen/:id')
  .get(setupController.getGameScreen);

// deploy server
app.listen(PORT, err => {
  if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
  console.log(`Server is Listening on: http://localhost:${PORT}/`);
});