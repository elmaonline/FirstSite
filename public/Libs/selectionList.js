
var SelectionList = function () {   
    this.selection =[];
    
    this.multiSelect=false;
    
    
    
};


SelectionList.prototype = {

    populateList: function (data, func,context,container) {
       
        var selectEvents = [];
		var newInner = "";
        
        
        // fill out HTML
		$.each( data, function( key, val ) {
			
            var lmenuid= val.menuId;
            var ldisplayname = val.displayName;
            
            
            
			var hidPID = '<input type="hidden" name="menuId" id="menuId" value ="' + lmenuid + '"/>';
			
			var arIdx = jQuery.inArray(lmenuid, this.selection);

            if (arIdx >= 0) { // selected
                newInner+= '<a id ="menu'+ lmenuid + '" href="" class ="mitem highLightRow">'+ldisplayname+hidPID+'</a>'; 			
            }
            else {
                newInner+= '<a id ="menu'+ lmenuid + '" href="" class ="mitem">'+ldisplayname+hidPID+'</a>'; 			
            }
			
			selectEvents.push({ key: 'menu' + lmenuid, value: String(lmenuid) });			
		  });
	  
	    container = '#' + container;
	    
		$(container).html(newInner);
			
        
        
        
        var that = this;
        
        // link event method
        var iSelectMenu = function (evt) {
    
          // get the selection object
           that.selection = that.handleSelection(evt, container +' a', "#menuId");

            // now we need to work out which level we are on here
            
            if(container =='#menu-container' )
            {
                // do we have any children if so add them
                $.getJSON( "/menusByParentId?pid="+evt, function( data ) {
                    that.populateList(data, that.SelectMenu, that,'sub-menu-container');
                });
            }
           
            func.call(context,that.selection);
        };
        
		this.addlinks(selectEvents, iSelectMenu, context);
        
        
        
    },
    
    
    
    handleSelection: function (evt, selection, bodytag, id) {


        if (evt != undefined) {
            
            if(this.multiSelect){
                
                var arIdx = jQuery.inArray(evt, this.selection);
    
                if (arIdx == -1) {
                    this.selection.push(evt);
                }
                else {
                    this.selection.splice(arIdx, 1);
                }
            }
            else
            {
                this.selection=[];
                
                this.selection.push(evt);
            }
        }

        
        var that = this;
        
        $(bodytag).each(function () {
            $this = $(this)

            var quantity = $this.find(id).val();
            arIdx = jQuery.inArray(quantity, that.selection);

            if (arIdx == -1) {
                $this.removeClass('highLightRow');
            }
            else {
                $this.addClass('highLightRow');
            }
        }); //end each




        return this.selection;
    },

    addlinks: function (dupeEvents, func, context) {
        for (var i = 0; i < dupeEvents.length; i++) {

            $('body').off("click", "#" + dupeEvents[i].key);

            var somecrap = function (idx, val) {
                //probably not efficient to do this multiple times
                //this can be a future optimization.


                $('body').on("click","#" + dupeEvents[idx].key, $.proxy(function () {
                    var va = val;

                    //console.log('clicked with : ' + va);

                    if (va !== null)
                        func.call(context, va);
                    else
                        func.call(context);

                    return false;
                }, context));

            };

            somecrap(i, dupeEvents[i].value);

        }

    }
};

