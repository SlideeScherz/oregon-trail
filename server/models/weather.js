function gameWeather(Id, Name, Health, Miles, Probability) {
  this.weatherIdentification = Id;
  this.weatherName = Name;
  this.weatherHealth = Health;
  this.weatherMiles = Miles;
  this.weatherProbability = Probability;
}


exports.weatherOptions = function (Id, Name, Health, Miles, Probability) {
  var weather = new gameWeather(Id, Name, Health, Miles, Probability);
  return weather;
}