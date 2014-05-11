module.exports = function(app,express) {

	app.get('/helloworld', function(req, res) {
		var db = req.images;
		db.find({}).exec(function(err, result) {
			  if (!err) {
				// handle result
				console.log (result);		
				res.json(result);		
			  } else {
				console.log (err);
			  };
			});
	});
	
 	app.get('/menus', function(req, res) {			
		var db = req.menus;	
		db.find({}).exec(function(err, result) {
			  if (!err) {
				// handle result
				console.log (result);		
				res.json(result);		
			  } else {
				console.log (err);
			  };
			});
	});
};
 