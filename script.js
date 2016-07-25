$("#taylor").hide();
$("#drake").hide();
$("#shawn").hide();
$("#rihanna").hide();

$("#taylorBtn").hide();
$("#drakeBtn").hide();
$("#shawnBtn").hide();
$("#rihannaBtn").hide();

$("#spotify").click(function(){
$("#taylorBtn").show();
$("#drakeBtn").show();
$("#shawnBtn").show();
$("#rihannaBtn").show();
document.getElementById("tour1").style.height = 'auto';
document.getElementById("events").style.height = 'auto';
document.getElementById("contact").style.height = 'auto';    


var url='https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02/top-tracks?country=US';
var url2='https://api.spotify.com/v1/artists/7n2wHs1TKAczGzO7Dd2rGr/top-tracks?country=US';
var url3='https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4/top-tracks?country=US';
var url4='https://api.spotify.com/v1/artists/5pKCCKE2ajJHZ9KAiaK11H/top-tracks?country=US';

$("#taylorBtn").click(function(){
   
    $("#taylor").show();
    $("#drake").hide();
    $("#shawn").hide();
    $("#rihanna").hide();
$.getJSON(url,function(data) {
     var html="";
    html+='<table class="table table-bordered table-sm">';
        html+='<tr><th>Title</th><th>Artist</th><th>Song Link</th></tr>';
   for(var i=0;i<data.tracks.length;i++){
       html+="<tr><td>"+data.tracks[i].album.name+"</td>";
       html += "<td><img src='"+data.tracks[i].album.images[2].url+"'</td>";
       html+= "<td><a href='"+data.tracks[i].preview_url+"'target=\"main\" >Play Song</a></td></tr>";
   
   }
    html+='</table>';
    $("#taylor").html(html);
});
});
$("#shawnBtn").click(function(){
$.getJSON(url2,function(data) {
     $("#taylor").hide();
    $("#drake").hide();
    $("#shawn").show();
    $("#rihanna").hide();
     var html="";
    html+='<table class="table table-bordered table-sm">';
        html+='<tr><th>Title</th><th>Artist</th><th>Song Link</th></tr>';
   for(var i=0;i<data.tracks.length;i++){
       html+="<tr><td>"+data.tracks[i].album.name+"</td>";
       html += "<td><img src='"+data.tracks[i].album.images[2].url+"'</td>";
       html+= "<td><a href='"+data.tracks[i].preview_url+"'target=\"main\" >Play Song</a></td></tr>";
   
   }
    html+='</table>';
    $("#shawn").html(html);
});
});

    $("#drakeBtn").click(function(){
$.getJSON(url3,function(data) {
     $("#taylor").hide();
    $("#drake").show();
    $("#shawn").hide();
    $("#rihanna").hide();
     var html="";
    html+='<table class="table table-bordered table-sm">';
        html+='<tr><th>Title</th><th>Artist</th><th>Song Link</th></tr>';
   for(var i=0;i<data.tracks.length;i++){
       html+="<tr><td>"+data.tracks[i].album.name+"</td>";
       html += "<td><img src='"+data.tracks[i].album.images[2].url+"'</td>";
       html+= "<td><a href='"+data.tracks[i].preview_url+"'target=\"main\" >Play Song</a></td></tr>";
   
   }
    html+='</table>';
    $("#drake").html(html);
});
    });

    $("#rihannaBtn").click(function(){
$.getJSON(url4,function(data) {
     $("#taylor").hide();
    $("#drake").hide();
    $("#shawn").hide();
    $("#rihanna").show();
     var html="";
    html+='<table class="table table-bordered table-sm">';
        html+='<tr><th>Title</th><th>Image</th><th>Song Link</th></tr>';
   for(var i=0;i<data.tracks.length;i++){
       html+="<tr><td>"+data.tracks[i].album.name+"</td>";
       html += "<td><img src='"+data.tracks[i].album.images[2].url+"'</td>";
       html+= "<td><a href='"+data.tracks[i].preview_url+"'target=\"main\">Play Song</a></td></tr>";
   
   }
    html+='</table>';
    $("#rihanna").html(html);
});
    });
});

    