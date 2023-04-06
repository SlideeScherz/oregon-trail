const paces = [
  { name: 'Resting', healthEffect: 10, mileage: 0 },
  { name: 'Steady', healthEffect: 0, mileage: 20 },
  { name: 'Strenuous', healthEffect: -3, mileage: 30 },
  { name: 'Grueling', healthEffect: -5, mileage: 35 },
];

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

const weathers = [
  { id: 0, name: 'Very Hot', healthEffect: -8, mileEffect: 0.7, probability: 0.1 },
  { id: 1, name: 'Hot', healthEffect: -3, mileEffect: 0.9, probability: 0.1 },
  { id: 2, name: 'Warm', healthEffect: 1, mileEffect: 1, probability: 0.2 },
  { id: 3, name: 'Cool', healthEffect: 1, mileEffect: 0.95, probability: 0.1 },
  { id: 4, name: 'Cold', healthEffect: -5, mileEffect: 0.8, probability: 0.1 },
  { id: 5, name: 'Very Cold', healthEffect: -12, mileEffect: 0.7, probability: 0.1 },
  { id: 6, name: 'Rain', healthEffect: -4, mileEffect: 0.6, probability: 0.1 },
  { id: 7, name: 'Heavy Rain', healthEffect: -8, mileEffect: 0.4, probability: 0.05 },
  { id: 8, name: 'Snow', healthEffect: -15, mileEffect: 0.3, probability: 0.05 },
  { id: 9, name: 'Blizzard', healthEffect: -30, mileEffect: 0.1, probability: 0.05 },
  { id: 10, name: 'Heavy Fog', healthEffect: -3, mileEffect: 0.5, probability: 0.05 },
];

const distanceMessages = [
  'Finally out of Texas. However they say the worst is ahead of us...',
  'Halfway there pioneer!',
  'These trees are getting greener by the mile!',
];

const stats = {
  pace: paces[0],
  weather: weathers[2],
  terrain: terrains[2],
  messages: [''],
  milesTraveled: 0,
  groupHealth: 100,
  daysOnTrail: 0,
  // appended
  hasGameBegan: false,
  gameState: 'Playing',
};

module.exports = { stats, paces, terrains, weathers, distanceMessages };
