//function to return the pace
const paces = [
  { name: "Resting", healthEffect: +5, mileage: 0 },
  { name: "Steady", healthEffect: 0, mileage: 20 },
  { name: "Strenuous", healthEffect: -3, mileage: 30 },
  { name: "Grueling", healthEffect: -8, mileage: 35 },
];

const defaultPace = { name: "Select A Pace (1-4)", healthEffect: 0, mileage: 0 };

module.exports = { paces, defaultPace };
