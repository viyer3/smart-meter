router.get('/transactions', function(req, res, next) {
	res.locals.connection.query('select * from members', function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
});
