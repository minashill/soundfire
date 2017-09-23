$(document).ready(function() {
var LastfmAPI = require('lastfmapi');
var lfm = new LastfmAPI({
    'api_key' : '493f7a88030f6c7842e6bbf97ad8ce5e',
    'secret' : '17e7b84f04cd561a2137a0d9f2776e9f'
});

/*Initialize LastFM Authorization*/
// var token = window.location.search.split('?token=')[1];
// LastFM API Key: 7ec54293b71ff780b78575e0bda44e26
if(token) {
 //display search
 document.getElementById('initsearch').style.display = "block";
 document.getElementById('login').style.display = "none";
 $('#bgvid').remove();
} else {
  // display login
  document.getElementById('login').style.display = "block";
  
}
/*End LastFM Authorization*/

/*Initialize TourSchedule for Bands in Town*/
function getTourSchedule(artist) {
  var bandsInTownURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=adio";

  $.get(bandsInTownURL)
      .done(function(response){
        for (var i = 0; i < response.length; i++) { //On the API, grab the first content of the array to the length of the array
            var row = $('<tr>');// On the html table go to the row
             row.append('<td>'+ response[i].venue.name);// On the row, the first item is the venue name eg Pepsi Center is a venue
             var d = response[i].datetime.slice(0,10).split('-');
             var convDate = d[1]+'/'+d[2]+'/'+d[0];
             row.append('<td>'+convDate);
             // row.append('<td>' + response[i].datetime);//the second item is the date the gig will play
             row.append('<td>'+ response[i].venue.city);//the city in which the venue is. Eg pepsi center is in Denver

             row.append('<td> <a href="'+ response[i].offers[0].url + '" target="_blank"> Buy Tickets');// Make the content here clickable


         $("#artist-table tbody").append(row);//On the html display all the information
     } 

        //$("#tour").text(artistData);
      });
}
/*End TourSchedule via Bands in Town*/

/* Initialize Artist Search through LastFM*/
function lastFMSearch(artist) {
  var lastFMSearchURL = "https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + artist + "&api_key=7ec54293b71ff780b78575e0bda44e26&format=json";
  // Can be used to strip for artist picture
  $.get(lastFMSearchURL)
    .done(function(response){
      var img = $('<img class="activator">');
      var h2 = $('<h2 class="header text_b" >');
      var artName = response.results.artistmatches.artist[0].name;
      var artPic = response.results.artistmatches.artist[0].image[2]['#text'];

      h2.append(artName);
      img.attr('src', artPic);
      img.attr("alt", artName);
      $('#artistName').html(h2);
      $('#artistPic').html(img);

    });
}
/* End Artist Search through LastFM */

function lastFMGetSimilarArtists(artist) {
  var lastFMGetSimilarArtistsURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=7ec54293b71ff780b78575e0bda44e26&format=json";

  $.get(lastFMGetSimilarArtistsURL)
    .done(function(response){
      var div = $('<div>');
      div.addClass('carousel');
      var a = $('<a>');
      a.addClass('carousel-item');
      

      for(i = 0; i < 3; i++) {
      var artName = response.similarartists.artist[i].name;
      var artPic = response.similarartists.artist[i].image[2]['#text'];
        var img = $('<img>');
        // var li = $('<li>');
        // var h1 = $('<h3>');
        h1.append(artName);
        
        img.attr('src', artPic);
        img.attr("alt", artName);
        h1.addClass('caption left-align');
        // li.append(bandName);
        // p.attr("display", "none");
        // li.append(h1);
        a.append(img);
        img.append('<h2 class="header text_b">')
        // img.on('mouseenter', function(){
        //   p.slideToggle();
        // });

        // img.on('mouseleave', function() {
        //   p.slideToggle();
        // });
        // ul.append(li);
      }
      // div.append(ul);
      $("#suggest").html(div);
      // $('.slider').slider();
    });
}


function lastFMGetArtistInfo(artist) {
	var lastFMGetArtistInfoURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=7ec54293b71ff780b78575e0bda44e26&format=json";

	$.get(lastFMGetArtistInfoURL)
		.done(function(response){
			var artInfo = response.artist.bio.summary;
			var p = $('<p>');
			p.append(artInfo);
			$('#bio').html(p);
		})
}

$(".searchBar").on("submit", function(event) {
  var artist = $(this).find('input').val().trim();

  event.preventDefault();

  $("#artist-table tbody").empty();

  document.getElementById('header').style.display = "block";
  document.getElementById('results').style.display = "block";
  document.getElementById('initsearch').style.display = "none";

  getTourSchedule(artist);
  lastFMSearch(artist);
  lastFMGetSimilarArtists(artist);  
  lastFMGetArtistInfo(artist);

});



}); // onReady end
