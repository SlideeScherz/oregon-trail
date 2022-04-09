//create a function for a terrian obj 
//each time the terrian changes change the img on the page
function gameTerrain(Name, Image, milesEffect) {
  this.terrainName = Name;
  this.terrainImage = Image;
  this.terrainMilesEffect = milesEffect;
}

//export the terrain
exports.terrainOptions = function(Name, Image, milesEffect) {

  var terrain = new gameTerrain(Name, Image, milesEffect);
  return terrain;
}
