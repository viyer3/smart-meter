const express	= require('express');
const https	= require('https');
const fs	= require('fs');
//const cors	= require('cors');

const options = {
	key: fs.readFileSync('test/keys/key.pem'),
	cert: fs.readFileSync('test/keys/cert.pem')
};

const app = express();
//app.use(cors());

app.get('/', (req, res) => {
	console.log(`Receiving connection: ${req}`);
	res.send("This is smart-meter on https");
});

https.createServer(options, app).listen(80, () => {
	console.log("https server started on port 3000");
});
