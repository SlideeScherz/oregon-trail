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

const getGameDataObj = () => {
  return gameDataObj;
};

module.exports = { getGameDataObj };
