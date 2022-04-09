//function to return the pace
function gamePace(Name, Health, Mileage) {
  this.paceName = Name;
  this.paceHealth = Health;
  this.paceMileage = Mileage;
}

//list of logic for pace
//add each pace to the list with the correct data type
var allPaces = []; 
allPaces.push(new gamePace("Steady", 0, 20));
allPaces.push(new gamePace("Strenuous", -3, 30));
allPaces.push(new gamePace("Grueling", -8, 35));
allPaces.push(new gamePace("Resting", +5, 0));

exports.paceOptions = function () {
  return (allPaces);
}

