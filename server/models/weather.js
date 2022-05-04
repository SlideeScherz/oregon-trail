const weather = [
  { name: "Very Hot", healthEffect: -8, mileEffect: 0.7, probability: 0.1 },
  { name: "Hot", healthEffect: -3, mileEffect: 0.9, probability: 0.1 },
  { name: "Warm", healthEffect: 1, mileEffect: 1, probability: 0.2 },
  { name: "Cool", healthEffect: 1, mileEffect: 0.95, probability: 0.1 },
  { name: "Cold", healthEffect: -5, mileEffect: 0.8, probability: 0.1 },
  { name: "Very Cold", healthEffect: -12, mileEffect: 0.7, probability: 0.1 },
  { name: "Rain", healthEffect: -4, mileEffect: 0.6, probability: 0.1 },
  { name: "Heavy Rain", healthEffect: -8, mileEffect: 0.4, probability: 0.05 },
  { name: "Snow", healthEffect: -15, mileEffect: 0.3, probability: 0.05 },
  { name: "Blizzard", healthEffect: -30, mileEffect: 0.1, probability: 0.05 },
  { name: "Heavy Fog", healthEffect: -3, mileEffect: 0.5, probability: 0.05 },
];

exports.getWeather = () => {
  return weather;
};
