//function to return the pace
const paces = [
  { name: "Steady", healthEffect: 0, mileage: 20 },
  { name: "Strenuous", healthEffect: -3, mileage: 30 },
  { name: "Grueling", healthEffect: -8, mileage: 35 },
  { name: "Resting", healthEffect: +5, mileage: 0 }
]

exports.getPaces = () => {
  return paces;
}
