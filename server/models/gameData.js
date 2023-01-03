const paces = [
  { name: 'Resting', healthEffect: +5, mileage: 0 },
  { name: 'Steady', healthEffect: 0, mileage: 20 },
  { name: 'Strenuous', healthEffect: -3, mileage: 30 },
  { name: 'Grueling', healthEffect: -8, mileage: 35 },
];

// def 0

const terrains = [
  {
    name: 'Mountains',
    image: '<img src="/images/mountains.jpeg" width="200px" height="200px">',
  },
  {
    name: 'Grassland',
    image: '<img src="/images/grassland.jpeg" width="200px" height="200px">',
  },
  {
    name: 'Plains',
    image: '<img src="/images/plains.jpeg" width="200px" height="200px">',
  },
  {
    name: 'Forrest',
    image: '<img src="/images/forrest.jpeg" width="200px" height="200px">',
  },
  {
    name: 'Desert',
    image: '<img src="/images/desert.jpeg"width="200px" height="200px">',
  },
];

// def plains

const weathers = [
  { name: 'Very Hot', healthEffect: -8, mileEffect: 0.7, probability: 0.1 },
  { name: 'Hot', healthEffect: -3, mileEffect: 0.9, probability: 0.1 },
  { name: 'Warm', healthEffect: 1, mileEffect: 1, probability: 0.2 },
  { name: 'Cool', healthEffect: 1, mileEffect: 0.95, probability: 0.1 },
  { name: 'Cold', healthEffect: -5, mileEffect: 0.8, probability: 0.1 },
  { name: 'Very Cold', healthEffect: -12, mileEffect: 0.7, probability: 0.1 },
  { name: 'Rain', healthEffect: -4, mileEffect: 0.6, probability: 0.1 },
  { name: 'Heavy Rain', healthEffect: -8, mileEffect: 0.4, probability: 0.05 },
  { name: 'Snow', healthEffect: -15, mileEffect: 0.3, probability: 0.05 },
  { name: 'Blizzard', healthEffect: -30, mileEffect: 0.1, probability: 0.05 },
  { name: 'Heavy Fog', healthEffect: -3, mileEffect: 0.5, probability: 0.05 },
];

const gameDataObj = {
  pace: null,
  weather: null,
  terrain: null,
  messages: null,
  playerNames: null,
  playerStatus: null,
  profession: null,
  money: null,
  startMonth: null,
  milesTraveled: null,
  groupHealth: null,
  daysOnTrail: null,
  // boolean switch for when the game has began
  hasGameBegan: false,
};

/**
 * default values if the game is reset
 */
const defaultGameDataObj = {
  pace: paces[0],
  weather: weathers[2],
  terrain: terrains[2],
  messages: [''],
  playerNames: [''],
  playerStatus: [''],
  profession: '',
  money: 0,
  startMonth: '',
  milesTraveled: 0,
  groupHealth: 100,
  daysOnTrail: 0,
  hasGameBegan: false,
};

module.exports = { gameDataObj, defaultGameDataObj, paces, terrains, weathers };
