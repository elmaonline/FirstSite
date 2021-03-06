// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var flash 	 = require('connect-flash');

var configDB = require('./config/database.js');

// configuration ===============================================================
// configuration ===============================================================
mongoose.connect(configDB.settings.url, function (err, res) {
  if (err) {
	console.log ('ERROR connecting to: ' + configD.settings.url + '. ' + err);
  } else {
	console.log ('Succeeded connected to: ' + configDB.settings.url);
  }
});
 
var Image = mongoose.model('images', configDB.image);
var Menu = mongoose.model('menus', configDB.menu);


app.configure(function() {

	var oneDay = 1;

	app.use(express.compress());

	console.log('static contents at: ' + __dirname + '/public');

	app.use('/public', express.static(__dirname + '/public', { maxAge: oneDay }));
	
    // set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret

	app.use(flash()); // use connect-flash for flash messages stored in session
	
	// Make our db accessible to our router
	app.use(function(req,res,next){
		req.images = Image;
		req.menus = Menu;
		next();
	});
});



// routes ======================================================================
require('./app/routes.js')(app,express); // load our routes and pass in our app and fully configured passport

// launch ======================================================================


app.listen(port);
console.log('The magic happens on port ' + port);