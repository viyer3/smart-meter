const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const cors = require('cors')
// https://github.com/mysqljs/mysql
const connection = mysql.createConnection({
	host     : '35.193.20.163',
	user     : 'root',
	password : 'toor',
	database : 'usr'
});

// Initialize the app
const app = express();

app.use(cors())

// https://expressjs.com/en/guide/routing.html
app.get('/transactions/:plate', function (req, res) {
	console.log('connecting...');
	//connection.connect();
	console.log('connected');

	connection.query("SELECT trans_id, loc_id, start_time, start_date, MINUTE(TIMEDIFF(cast(concat(end_date, ' ', end_time) as datetime), cast(concat(start_date, ' ', start_time) as datetime)))*Price AS Cost FROM user NATURAL JOIN transaction WHERE plate_num = " + req.params['plate'] + ';', function (error, results, fields) {
		if (error) throw error;
		console.log(results)
		res.send(results)
	});

	//connection.end();
});

// https://expressjs.com/en/guide/routing.html
app.get('/total/:id', function (req, res) {
	console.log('connecting...');
	//connection.connect();
	console.log('connected');

	connection.query("SELECT fname, lname, SUM(MINUTE(TIMEDIFF(cast(concat(end_date, ' ', end_time) as datetime), cast(concat(start_date, ' ', start_time) as datetime)))*Price) AS Balance FROM user NATURAL JOIN transaction NATURAL JOIN account WHERE user_id = " + req.params['id'] + ';', function (error, results, fields) {
		if (error) throw error;
		console.log(results)
		res.send(results)
	});

	//connection.end();
});
// Start the server
app.listen(3003, () => {
 console.log('Go to http://localhost:3003/posts to see posts');
});
