const express	 = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql2');
const _mysql     = require('mysql2/promise');
const cors 	 = require('cors')
const basicAuth	 = require('express-basic-auth');
const bcrypt	 = require('bcrypt');
const base64	 = require('base-64');

//mysql
const mysqlInfo = {
	host     : '172.17.0.2',
	user     : 'root',
	password : 'metre',
	database : 'usr_clear',
	insecureAuth: true,
}

const connection = mysql.createPool(mysqlInfo);

//user tokenization
const createSessionId = (() => {
	let itr = 0;
	let _ = () => {
		itr += 1;
		let sessid = bcrypt.hashSync(`${itr}`, 3);
		return sessid;
	};
	return _;
})();

//Prepared as a temporary solution only
const existingSessions = {
	//user: session id
};

//basic auth objects
const getUnauthorizedResponse = (req) => {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

const credAuthCheck = async (user, pass, auth) => {
	const conn = await connection.promise();//_mysql.createConnection(mysqlInfo);
	const [rows, fields] = await conn.query(`SELECT pw_hash FROM user WHERE email="${user}";`)
	if(rows.length != 1)
		return auth(null, false)
	const passwordHash = rows[0]['pw_hash']
	const res = await bcrypt.compare(pass, passwordHash)
	//conn.end()
	return auth(null, res);
}
const credAuth = basicAuth({
	authorizer: credAuthCheck,
	authorizeAsync: true,
	unauthorizedResponse: getUnauthorizedResponse
})

const tokenAuthCheck = (user, pass) => {
	let res = false
	if(user in existingSessions){
		const session = existingSessions[user]
		res = bcrypt.compare(pass, session)
	}
	return res;
}
const tokenAuth = basicAuth({
	authorizer: tokenAuthCheck,
	unauthorizedResponse: getUnauthorizedResponse
})

const fakeAuthCheck = (user, pass) => true
const fakeAuth = basicAuth({
	authorizer: fakeAuthCheck,
})

const app = express();
app.use(cors())//.use(tokenAuth)

//This is the only endpoint that should not require authorization
//It will complete a separate authorization for username:password
app.get('/sess', credAuth, (req, res) => {
	//Get username from authorization headers
	/*
	let authHeader = req.headers.authorization
	authHeader = authHeader.split(" ")[1];
	authHeader = base64.decode(authHeader);
	const username = authHeader.split(":")[0];
	*/

	const session = createSessionId();
	existingSessions[req.auth.user] = session;
	
	res.send(`${session}`)}
);

// https://expressjs.com/en/guide/routing.html
app.get('/test', tokenAuth, (req, res) => {
	console.log("Incoming test");
	connection.query("SELECT * FROM locale;", (err, result, fields) => {
		if(err){
			res.send(err);
		}else{
			res.send(result);
		}
	});
});

app.get('/user/:id', tokenAuth, (req, res) => {
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

app.get('/trans/:plate', tokenAuth, (req, res) => {
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

app.get('/acc/user/total/:id', tokenAuth, (req, res) => {
	connection.query(`SELECT SUM((TIME_TO_SEC(TIMEDIFF(end_datetime, start_datetime))/3600)*rate) AS cost FROM transaction JOIN user WHERE user_id=${req.params['id']};`, (sqlerr, sqlres, sqlfields) => {
		if(sqlerr){res.send(sqlerr);
		}else{res.send(sqlres);}
	});
});

app.get('/acc/user/plates/:id', tokenAuth, (req, res) => {
	connection.query(`SELECT plate, SUM((TIME_TO_SEC(TIMEDIFF(end_datetime, start_datetime))/3600)*rate) AS cost FROM transaction JOIN user WHERE user_id=${req.params['id']} GROUP BY plate, user_id;`, (sqlerr, sqlres, sqlfields) => {
		if(sqlerr){res.send(sqlerr);}
		else{res.send(sqlres);}
	});
});

// Start the server
app.listen(3003, () => {
	console.log('Node started at http://localhost:3003/');
});
