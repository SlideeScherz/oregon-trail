const mountainsImg = "<img src=\"/images/mountains.jpeg\" width=\"200px\" height=\"200px\">";
const grasslandImg = "<img src=\"/images/grassland.jpeg\" width=\"200px\" height=\"200px\">";
const plainsImg = "<img src=\"/images/plains.jpeg\" width=\"200px\" height=\"200px\">";
const forrestImg = "<img src=\"/images/forrest.jpeg\" width=\"200px\" height=\"200px\">";
const desertImg = "<img src=\"/images/desert.jpeg\"width=\"200px\" height=\"200px\">";
const defaultImg = "<img src=\"/images/goodLuckMsg.png\" width=\"200px\" height=\"200px\">";

//create a function for a terrian obj 
//each time the terrian changes change the img on the page
class gameTerrain {
  constructor(Name, Image, milesEffect) {
    this.terrainName = Name;
    this.terrainImage = Image;
    this.terrainMilesEffect = milesEffect;
  }
}


var terrainArray = [];

defaultTerrain = new gameTerrain("Start Game to select a terrain", defaultImg, 0);

terrainArray.push(new gameTerrain("Mountains", mountainsImg, -5));
terrainArray.push(new gameTerrain("Grassland", grasslandImg, +5));
terrainArray.push(new gameTerrain("Plains", plainsImg, +5));
terrainArray.push(new gameTerrain("Forrest", forrestImg, 0));
terrainArray.push(new gameTerrain("Desert", desertImg, -5));


//method to chose a random terrain using a random math int
//returns one object from array
exports.simulateTerrain = function() {

  //find length of array 
  var len = terrainArray.length;

  //select a random item from array of weathers
  var i = Math.floor(Math.random() * len);

  //gameStats.currentTerrain = terrainArray[i];
  return terrainArray[i];
}

//export the terrain
exports.terrainOptions = function() {
  return terrainArray;
}