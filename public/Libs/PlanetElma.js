function PlanetElma(loader) {

    this.loader = loader;
	this.selectedMenu=0;

}


PlanetElma.prototype.LoadImages = function () {

	 
    var idx = 0;
    var newInner = "";

	$.getJSON( "/helloworld", function( data ) {
		$.each( data, function( key, val ) {
			newInner+= '<a id ="image"'+ key + ' href="" class ="frame"><img src="/Images/'+val.smallImage + '"></a>';  
		  });
	  
		$('#gallery-container').html(newInner);
	});

	$('body').on("click", ".frame", $.proxy(function () { this.SelectImage(); return false; }, this));
};

PlanetElma.prototype.SelectImage = function () {
// get selection id
};


PlanetElma.prototype.LoadMenus = function () {

	 
    var idx = 0;
    var newInner = "";

	$.getJSON( "/menus", function( data ) {
	
		$.each( data, function( key, val ) {
			newInner+= '<a id ="menu"'+ val.menuId + ' href="" class ="mitem">'+val.displayName+'</a>';  
		  });
	  
		$('#menu-container').html(newInner);
	});

	$('body').on("click", ".mitem", $.proxy(function () { this.SelectMenu(); return false; }, this));
	
    //$('myOjbect').css('background-image', 'url(' + imageUrl + ')');


};

PlanetElma.prototype.SelectMenu = function () {

};