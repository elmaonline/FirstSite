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
        
        
        var query = db.find({});

 
        query.where('parentMenuId',0);
        
		query.exec(function(err, result) {
			  if (!err) {
				// handle result
				console.log (result);		
				res.json(result);		
			  } else {
				console.log (err);
			  };
			});
	});
    
    
    
    app.get('/menusByParentId', function(req, res) {			
		var db = req.menus;	
        
        
        
        var menuIdArray = [];    
        var reqStr = req.param("pid") ; 
        
        if(reqStr.indexOf(",") == -1)
        {
            menuIdArray.push(reqStr);
       }
        else{
            menuIdArray = JSON.parse("[" + reqStr + "]");
       }
        
        console.log('pid value: '+menuIdArray);
        
        
        
        
        var query = db.find({});

        query.where('parentMenuId').in(menuIdArray);
   
        
		query.exec(function(err, result) {
			  if (!err) {
				// handle result
				console.log (result);		
				res.json(result);		
			  } else {
				console.log (err);
			  };
			});
	});
    
    
    
    app.get('/imagebymenuid', function(req, res) {
		var db = req.images;
        
        
        var menuIdArray = [];    
        var reqStr = req.param("mid") ; 
        
        if(reqStr.indexOf(",") == -1)
        {
            menuIdArray.push(reqStr);
       }
        else{
            menuIdArray = JSON.parse("[" + reqStr + "]");
       }
        
        console.log('mid value: '+menuIdArray);
        
        
        
        
        
        var query = db.find({});

        query.where('menuId').in(menuIdArray);
        
        query.where('parentCId',0);//.in(0);
        
        
        query.exec(function(err, result) {
            console.log('got results');
			  if (!err) {
				// handle result
			//	console.log ('results: ' + result);
                  res.json(result);	
			 		
			  } else {
				console.log ('error: '+err);
			  };
			});
        
        
        
        
	//	db.find({ menuId: reqStr }).exec(function(err, result) {
		//	  if (!err) {
				// handle result
			//	console.log (result);		
		//		res.json(result);		
		//	  } else {
		//		console.log (err);
			//  };
		//	});
	});
    
    app.get('/imagebyparentid', function(req, res) {
        var db = req.images;

        var parentId = req.param("pid");    

        db.find({ parentCId: parentId }).exec(function(err, result) {
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
 