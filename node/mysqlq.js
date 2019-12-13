const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql2');
const cors = require('cors')
// https://github.com/mysqljs/mysql
const connection = mysql.createConnection({
	host     : '172.17.0.2',
	user     : 'root',
	password : 'metre',
	database : 'usr',
	insecureAuth: true,
});

// Initialize the app
const app = express();

app.use(cors())

app.get('/test', (req, res) => {
	console.log("Incoming test");
	connection.query("SELECT * FROM user;", (err, result, fields) => {
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
	});
});

// https://expressjs.com/en/guide/routing.html
app.get('/transactions/:plate', function (req, res) {
	console.log('connecting...');
	//connection.connect();
	console.log('connected');

	connection.query('SELECT loc_id, start_time, MINUTE(TIMEDIFF(end_time, start_time))*rate AS Cost FROM user NATURAL JOIN transaction WHERE plate = "' + req.params['plate'] + '";', function (error, results, fields) {
		if(error){
			res.send(error);
		}else{
			console.log(results);
			res.send(results);
		}
	});

	//connection.end();
});

// https://expressjs.com/en/guide/routing.html
app.get('/total/:id', function (req, res) {
	console.log('connecting...');
	//connection.connect();
	console.log('connected');

	connection.query("SELECT fname, lname, SUM(MINUTE(TIMEDIFF(end_time, start_time)))*rate AS Balance FROM user NATURAL JOIN transaction NATURAL JOIN user as A WHERE A.id = " + req.params['id'] + ' GROUP BY plate;', function (error, results, fields) {
		if(error){
			res.send(error);
		}else{
			console.log(results);
			res.send(results);
		}
	});

	//connection.end();
});
// Start the server
app.listen(3003, () => {
 console.log('Go to http://localhost:3003/posts to see posts');
});
