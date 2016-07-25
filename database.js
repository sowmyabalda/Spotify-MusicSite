var databaseOptions = {
  fileName: "events_database",
  version: "1.0",
  displayName: "Event Database",
  maxSize: 1024
};

var database = openDatabase(
  databaseOptions.fileName,
  databaseOptions.version,
  databaseOptions.displayName,
  databaseOptions.maxSize
);

database.transaction(function( transaction ){
  transaction.executeSql("CREATE TABLE IF NOT EXISTS Events (uId INTEGER PRIMARY KEY AUTOINCREMENT, venueName TEXT NOT NULL,city TEXT NOT NULL,eventDate DATE NOT NULL, state TEXT NOT NULL);");
});



$("#newButton").click(function(){
var zipCode=$('#searchTerm').val();

var url='http://api.jambase.com/events?zipCode='+zipCode+'&page=0&api_key=ybasjb8x3k9z2ef5ghuskrhn&o=json'

$.getJSON(url,function(data) {
    
    for(var i=0;i<data.Events.length;i++){
        console.log(data.Events[i].Venue.Name);
    }
    var html = '<form role="form"><div class="form-group">';
    html +='<label for="make">Select Venue</label>'
  				+'<select class="form-control" id="venue">';
    html += '<option value="0">Pick One</option>';
 for(var i=0;i<data.Events.length;i++){
     var num = i+1;
  	html += '<option value ="'+num+'">'+data.Events[i].Venue.Name+'</option>';
  }

  html +='</select></div>';

  html += '<div class="form-group" id="price">';
  html += '</div>';
  html += '</form>';
  
  $("#modal-body").html(html);
    $("#venue" ).change(function() {
  	$("#price").html("");
    var price=[20,40,60];
  	var makeNum = Number(this.value) -1;
  	var modelhtml ='<label for="priceSel">Select Price</label>'
  				+'<select class="form-control" id="priceSel">';
  	modelhtml += '<option value="0">Pick One</option>';

  
	for(var i = 0;i<3;i++){
  		var num = i+1;
  		modelhtml += '<option value ="'+num+'">$'+price[i]+'</option>';
  	}
  	modelhtml +='</select></div>';

  	$("#price").html(modelhtml);
    
    });
    
    $("#saveArticle").click(function() {
//        alert("Database");
	var venue = Number($("#venue").val())-1;
	var price = Number($("#priceSel").val())-1;

    
	if(isNaN(venue) || venue == -1){
		alert("Select a venue");
	} else if(isNaN(price) || price == -1) {
		alert("Select a price");
	} else {
		
		var theVenueName = $("#venue option:selected").text();
		//var theModelName = $("#priceSel option:selected").text();
		

		database.transaction(function( transaction ){
        	transaction.executeSql("INSERT INTO Events (venueName, city, eventDate, state) VALUES ('"+theVenueName+"','"+data.Events[venue].Venue.City+"','"+data.Events[venue].Date+"','"+data.Events[venue].Venue.State+"')");
		});
		$("#myModal").modal("hide");
		displayPanelsFor();
         $("#venue").val(0);
       
	}
});

    function displayPanelsFor(){
	var panelHtml = '';


	database.transaction(function( transaction ){
		var sqlQuery = "SELECT * FROM Events ORDER BY uId DESC";
		

		transaction.executeSql(sqlQuery, [], function(transaction, results){

			if(results.rows.length == 0){
            	panelHtml += '<div class="panel panel-default">';
  				panelHtml += '<div class="panel-heading"><h3 class="panel-title">No Events Available</h3></div>';
  				panelHtml += '<div class="panel-body">Use the button on navigation to enter some items</div>';
  				panelHtml += '</div>';
  				$("#bookedEvents").html(panelHtml);

  			} else {
  				for(var i = 0;i<results.rows.length;i++){
  					console.log(results.rows[i].venueName);
  					panelHtml += '<div class="panel panel-default">';
  					panelHtml += '<div class="panel-heading clearfix"><div class="btn-group pull-right"><a href="#" class="btn btn-danger btn-sm">x</a></div><h3 class="panel-title">'+results.rows[i].venueName+' '+results.rows[i].eventDate+'</h3> </div>';
  					panelHtml += '</div>';
  					$("#bookedEvents").html(panelHtml);
  				}
  			}

		}, function(transaction, error){
			console.log(error);
		});
	});

}
    
});
});


  