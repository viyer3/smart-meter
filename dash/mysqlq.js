const express	 = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql2');
const cors 	 = require('cors')

const connection = mysql.createConnection({
	host     : '172.17.0.2',
	user     : 'root',
	password : 'metre',
	database : 'usr_clear',
	insecureAuth: true,
});

const app = express();
app.use(cors())

// https://expressjs.com/en/guide/routing.html
app.get('/test', (req, res) => {
	console.log("Incoming test");
	connection.query("SELECT * FROM locale;", (err, result, fields) => {
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
	});
});

app.get('/user/:id', (req, res) => {
	connection.query(`SELECT fname, lname FROM user WHERE user_id=${req.params['id']}`, (sqlerr, sqlres, sqlfields) => {
		if(sqlerr){
			res.send(sqlerr);
		}else{
			sqlres.forEach((_res) => {
				res.send(_res['fname']);
			});
		}
	});
});

app.get('/sess', (req, res) => res.send("WIP"));

app.get('/trans/:plate', (req, res) => {
	connection.query('SELECT country, locale, start_datetime, ((TIME_TO_SEC(TIMEDIFF(end_datetime, start_datetime))/3600)*rate) AS Cost FROM user NATURAL JOIN transaction NATURAL JOIN location NATURAL JOIN locale WHERE plate = "' + req.params['plate'] + '";', (sqlerr, sqlres, sqlfields) => {
		if(sqlerr){
			res.send(sqlerr);
		}else{
			res.send(sqlres);
		}
	});
});

//Notable queries:
//Get total cost for all vehicles for a user
//SELECT lname, SUM((TIME_TO_SEC(TIMEDIFF(end_datetime, start_datetime))/3600)*rate) AS cost FROM transaction JOIN user WHERE user_id=${} GROUP BY user_id;
//Get total cost for a single vehicle by license plate
//SELECT plate, SUM((TIME_TO_SEC(TIMEDIFF(end_datetime, start_datetime))/3600)*rate) AS cost FROM transaction JOIN user WHERE user_id=${} GROUP BY plate, user_id;
//Get costs of each individual plate for a user, ship with user info
//SELECT lname, plate, SUM((TIME_TO_SEC(TIMEDIFF(end_datetime, start_datetime))/3600)*rate) AS cost FROM transaction JOIN user WHERE user_id=${} GROUP BY plate, user_id;

app.get('/acc/user/total/:id', (req, res) => {
	connection.query(`SELECT SUM((TIME_TO_SEC(TIMEDIFF(end_datetime, start_datetime))/3600)*rate) AS cost FROM transaction JOIN user WHERE user_id=${req.params['id']};`, (sqlerr, sqlres, sqlfields) => {
		if(sqlerr){res.send(sqlerr);
		}else{res.send(sqlres);}
	});
});

app.get('/acc/user/plates/:id', (req, res) => {
	connection.query(`SELECT plate, SUM((TIME_TO_SEC(TIMEDIFF(end_datetime, start_datetime))/3600)*rate) AS cost FROM transaction JOIN user WHERE user_id=${req.params['id']} GROUP BY plate, user_id;`, (sqlerr, sqlres, sqlfields) => {
		if(sqlerr){res.send(sqlerr);}
		else{res.send(sqlres);}
	});
});

// Start the server
app.listen(3003, () => {
	console.log('Node started at http://localhost:3003/');
});
