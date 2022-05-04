const gameDataObj = {
  currentPace: {},
  currentWeather: {},
  currentTerrain: {},
  messages: [],
  playerNames: [],
  playerStatus: [],
  playerProfession: "",
  playerMoney: 0,
  startMonth: "",
  milesTraveled: 0,
  groupHealth: 100,
  daysOnTrail: 0,
};

// similar to a name in gameController
exports.getGameDataObj = () => {
  return gameDataObj;
};

// Fix setup routes then explore this
/*
exports.gameDataObj = {
  currentPace: {},
  currentWeather: {},
  currentTerrain: {},
  messages: [],
  playerNames: [],
  playerStatus: [],
  playerProfession: "",
  playerMoney: 0,
  startMonth: "",
  milesTraveled: 0,
  groupHealth: 100,
  daysOnTrail: 0,
};
*/
