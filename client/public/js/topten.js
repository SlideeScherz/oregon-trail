//user presses space and will be returned to main menu
document.body.addEventListener("keydown", function (event) {
    if (event.keyCode === 32) {
        window.location.replace("http://localhost:1337/mainmenu");
    }
});

//method to take 3 args and calaculate it as a score
function Score (name, points, date) {
	var input = { NAME:name, POINTS:points, DATE:date};
	return input;
}

//declare a list of scores 
var scores = [];

scores.push(Score("Scherz", 1000, "09/21/1999"));
scores.push(Score("Austin", 1223, "09/21/1999"));
scores.push(Score("Kyle F", 223, "09/21/1999"));
scores.push(Score("Kyle C", 233, "09/21/1999"));
scores.push(Score("Trevor S", 234, "09/21/1999"));
scores.push(Score("Dwayne", 100, "09/21/1999"));
scores.push(Score("Jhonny", 122, "09/21/1999"));
scores.push(Score("Arthur", 102, "09/21/1999"));
scores.push(Score("Marissa", 123, "09/21/1999"));
scores.push(Score("Allie", 200, "09/21/1999"));

//order the scores to display properly
scores.sort((a, b) => (a.POINTS < b.POINTS) ? 1 : -1);
 
//loop to only show 10 and create 10 instances
for (var i = 0; i < 10; i++) {
	document.getElementById("name" + i).innerHTML = scores[i].NAME;
	document.getElementById("points" + i).innerHTML = scores[i].POINTS;
	document.getElementById("date" + i).innerHTML = scores[i].DATE;
 }


