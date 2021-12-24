/*
var mysql = require('../models/topTen');

var con = mysql.createConnection({
	host: "localhost",
	user: "'userDemoUser'",
	password: "letmein!",
	database: "oregonTrailDB"
});

con.connect((err) => {
	if(err) throw err;
		console.log("Database (mysql) connected!");
		var sql = "use oregonTrailDB";
		con.query(sql, () => {
	if(err) throw err;
	})
});



// get users
exports.getScore = function(req, res) {
	var users = [];
	let sql = "select * from users;"
	con.query(sql, (err, rows, fields) => {
	if(err) throw err;
	for(let i=0; i< rows.length; i++) {
		let userRow = user.createUser(rows[i].firstName, rows[i].lastName,
		rows[i].email, rows[i].password);
		users.push(userRow);
}
	//console.log(users);
	res.setHeader('Content-Type', 'application/json');
	res.send(users);
});
}

// save users
exports.saveScore = function(req, res) {
	let sql = "insert into users (firstName, lastName, email, password) "
	+ "values ('"
	+ req.body.name + "', '"
	+ req.body.score + "', '"
	+ req.body.date + "', '"
	+ "');";

con.query(sql, (err, result) => {
	if(err) throw err;
	//console.log(result);
	res.setHeader('Content-Type', 'application/json');
	res.send(result);
})
}

*/