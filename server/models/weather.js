function gameWeather(Id, Name, Health, Miles, Probability) {
  this.weatherIdentification = Id;
  this.weatherName = Name;
  this.weatherHealth = Health;
  this.weatherMiles = Miles;
  this.weatherProbability = Probability;
}

defaultWeather = new gameWeather(0, "default", 0, 0, 0);


//populate weather data
var weatherArray = [];

weatherArray.push(new gameWeather(1, "Very Hot," - 8, .7, .1));

weatherArray.push(new gameWeather(2, "Hot", -3, .9, .1));
weatherArray.push(new gameWeather(3, "Warm", +1, 1, .2));
weatherArray.push(new gameWeather(4, "Cool", +1, .95, .1));
weatherArray.push(new gameWeather(5, "Cold", -5, .8, .1));
weatherArray.push(new gameWeather(6, "Very Cold", -12, .7, .1));
weatherArray.push(new gameWeather(7, "Rain", -4, .6, .1));
weatherArray.push(new gameWeather(8, "Heavy Rain", -8, .4, .05));
weatherArray.push(new gameWeather(9, "Snow", -15, .3, .05));
weatherArray.push(new gameWeather(10, "Blizzard", -30, .1, .05));
weatherArray.push(new gameWeather(11, "Heavy Fog", -3, .5, .05));


//method to chose a random weather using a random math int
//returns one object from array
exports.simulateWeather = function () {

  //select a value based on weather probability
  var winner = Math.random();
  var threshold = 0;
  for (let i = 0; i < weatherArray.length; i++) {
    threshold += parseFloat(weatherArray[i].weatherProbability);
    if (threshold > winner) {
      return weatherArray[i];
    }
  }
}




exports.weatherOptions = function () {
  return weatherArray;
}