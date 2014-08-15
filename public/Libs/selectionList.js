
var SelectionList = function () {   
    this.selection =[];
    
};


SelectionList.prototype = {

    populateList: function (data, func,context) {
       
        var selectEvents = [];
		var newInner = "";
        
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
	  
		$('#menu-container').html(newInner);
			
        
        var that = this;
        
        var iSelectMenu = function (evt) {
    
            that.handleSelection(evt, that.selection, '#menu-container a', "#menuId");
 
            func.call(context,that.selection);
        };
        
		this.addlinks(selectEvents, iSelectMenu, context);
        
        
        
    },
    
    
    
    handleSelection: function (evt, selection, bodytag, id) {


        if (evt != undefined) {
            var arIdx = jQuery.inArray(evt, selection);

            if (arIdx == -1) {
                selection.push(evt);
            }
            else {
                selection.splice(arIdx, 1);
            }
        }


        $(bodytag).each(function () {
            $this = $(this)

            var quantity = $this.find(id).val();
            arIdx = jQuery.inArray(quantity, selection);

            if (arIdx == -1) {
                $this.removeClass('highLightRow');
            }
            else {
                $this.addClass('highLightRow');
            }
        }); //end each




        return selection;
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

