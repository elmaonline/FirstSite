var mongoose = require('mongoose');

var image = new mongoose.Schema({
      cId: { type: Number, min: 0},
	  parentCId: { type: Number, min: 0},
	  imageName: { type: String, trim: true},
	  description: { type: String, trim: true},
	  menuId: { type: Number, min: 0},
	  contentDim: {
			 x: { type: Number, min: 0},
			 y: { type: Number, min: 0}
			},
      responseId: { type: Number, min: 0},
      lImage: {
             name: { type: String, trim: true},
			 x: { type: Number, min: 0},
			 y: { type: Number, min: 0}
			}
});

var menu = new mongoose.Schema({
	  menuId: { type: Number, min: 0},
	  parentMenuId: { type: Number, min: 0},
	  displayName: { type: String, trim: true},
	  description: { type: String, trim: true},
	  position:{type: Number, min: 0}
});

var settings  = {
	'url' : 'mongodb://elmaauth:george1984@ds043037.mongolab.com:43037/attribs'
};

module.exports.settings = settings;

module.exports.image = image;

module.exports.menu = menu;


