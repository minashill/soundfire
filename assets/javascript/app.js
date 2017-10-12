$(document).ready(function() {
   $('.carousel').carousel();
// var LastfmAPI = require('lastfmapi');
// var lfm = new LastfmAPI({
//     'api_key' : '493f7a88030f6c7842e6bbf97ad8ce5e',
//     'secret' : '17e7b84f04cd561a2137a0d9f2776e9f'
// });

/*Initialize LastFM Authorization*/
var token = window.location.search.split('?token=')[1];
// LastFM API Key: '493f7a88030f6c7842e6bbf97ad8ce5e';
if(token) {
 //display search
 // document.getElementById('initsearch').style.display = "block";
 // document.getElementById('login').style.display = "none";
 // $('#bgvid').remove();
} else {
  // display login
  // document.getElementById('login').style.display = "block";
  
}
/*End LastFM Authorization*/

/*Initialize TourSchedule for Bands in Town*/
function getTourSchedule(artist) {
  var bandsInTownURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=soundFire";

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
      var h2 = $('<h2 class="header text_b" >');
      h2.append('Live Shows');
      $("#tour").html(h2);

        //$("#tour").text(artistData);
      });
}
/*End TourSchedule via Bands in Town*/

/*Venue Search*/
function getVenue(venue) {
  var songKickURL = `http://api.songkick.com/api/3.0/search/venues.json?query=${venue}&apikey=YEZ681bUYQtJ1y2p`;
  console.log(venue);

  $.get(songKickURL)
    .done(function(response){
      var venueName = response.resultsPage.results.venue[0].displayName;
      var venueWeb = response.resultsPage.results.venue[0].website;
      var venueID = response.resultsPage.results.venue[0].id;
      var venueCity = response.resultsPage.results.venue[0].city.displayName;
      var venueState = response.resultsPage.results.venue[0].city.state.displayName;
      var venueStreet = response.resultsPage.results.venue[0].street;
      var venuePhone = response.resultsPage.results.venue[0].phone;
      var venueCapacity = response.resultsPage.results.venue[0].capacity;
      var h2 = $('<h2 class="header text_b" >');
      h2.append(venueName);
      console.log(venueName);
      $("#ven").html(h2);
      // resultsPage.results.event
    console.log(venueID);

  var songKickURL2 = `http://api.songkick.com/api/3.0/venues/${venueID}/calendar.json?apikey=YEZ681bUYQtJ1y2p`;
  console.log(venueID);
  console.log(songKickURL2);

  $.get(songKickURL2)
      .done(function(response){
        for (var i = 0; i < response.resultsPage.results.event.length; i++) { //On the API, grab the first content of the array to the length of the array
            var row1 = $('<tr>');// On the html table go to the row
             row1.append(`<td>${response.resultsPage.results.event[i].displayName.slice(0,)}`);// On the row, the first item is the event name 
             var d = response.resultsPage.results.event[i].start.datetime.slice(0,10).split('-');
             var convDate1 = d[1]+'/'+d[2]+'/'+d[0];
             row1.append('<td>'+convDate1);
             // row.append('<td>' + response[i].datetime);//the second item is the date the gig will play
             row1.append('<td>'+ response.resultsPage.results.event[i].location.city);//the city in which the venue is. Eg pepsi center is in Denver

             row1.append('<td> <a href="'+ response.resultsPage.results.event[i].uri + '" target="_blank"> Buy Tickets');// Make the content here clickable


         $("#venue-table tbody").append(row1);//On the html display all the information
         console.log(row1);
     } 
      

        //$("#tour").text(artistData);
      });

    });
  }
// city
function getCity(city) {
  var songKickURL3 = `http://api.songkick.com/api/3.0/search/locations.json?query=${city}&apikey={your_api_key}`;
  console.log(city);

  $.get(songKickURL3)
    .done(function(response){
      var cityName = response.resultsPage.results.location[0].city.displayName;
      var stateName = response.resultsPage.results.location[0].city.state.displayName;
      var areaID = response.resultsPage.results.location[0].metroArea.id;
      
      var h2 = $('<h2 class="header text_b" >');
      h2.append(`${cityName},${stateName}`);     
      $("#cit").html(h2);
      // resultsPage.results.event
    console.log(areaID);

  var songKickURL2 = `http://api.songkick.com/api/3.0/venues/${venueID}/calendar.json?apikey=YEZ681bUYQtJ1y2p`;
  console.log(venueID);
  console.log(songKickURL2);

  $.get(songKickURL2)
      .done(function(response){
        for (var i = 0; i < response.resultsPage.results.event.length; i++) { //On the API, grab the first content of the array to the length of the array
            var row1 = $('<tr>');// On the html table go to the row
             row1.append(`<td>${response.resultsPage.results.event[i].displayName.slice(0,)}`);// On the row, the first item is the event name 
             var d = response.resultsPage.results.event[i].start.datetime.slice(0,10).split('-');
             var convDate1 = d[1]+'/'+d[2]+'/'+d[0];
             row1.append('<td>'+convDate1);
             // row.append('<td>' + response[i].datetime);//the second item is the date the gig will play
             row1.append('<td>'+ response.resultsPage.results.event[i].location.city);//the city in which the venue is. Eg pepsi center is in Denver

             row1.append('<td> <a href="'+ response.resultsPage.results.event[i].uri + '" target="_blank"> Buy Tickets');// Make the content here clickable


         $("#venue-table tbody").append(row1);//On the html display all the information
         console.log(row1);
     } 
      

        //$("#tour").text(artistData);
      });

    });
  }





/* Initialize Artist Search through LastFM*/
function lastFMSearch(artist) {
  var lastFMSearchURL = "https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + artist + "&api_key=493f7a88030f6c7842e6bbf97ad8ce5e&format=json";
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
  var lastFMGetSimilarArtistsURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=493f7a88030f6c7842e6bbf97ad8ce5e&format=json";

$.get(lastFMGetSimilarArtistsURL)
    .done(function(response){
      var div = $('<div>');
      div.addClass('slider');
      var ul = $('<ul>');
      ul.addClass('slides');
      

      for(i = 0; i < 3; i++) {
      var bandName = response.similarartists.artist[i].name;
      var bandPic = response.similarartists.artist[i].image[2]['#text'];
        var img = $('<img>');
        var li = $('<li>');
        var h3 = $('<h3>');
        h3.append(bandName);
        
        img.attr('src', bandPic);
        img.attr("alt", bandName);
        li.attr("alt", bandName);
        h3.addClass('caption left-align');
        // li.append(bandName);
        // p.attr("display", "none");
        li.append(h3);
        li.append(img);
        img.addClass('sugPic');
        // img.on('mouseenter', function(){
        //   p.slideToggle();
        // });

        // img.on('mouseleave', function() {
        //   p.slideToggle();
        // });
        ul.append(li);
      }
      var h2 = $('<h2 class="header text_b" >');
      div.append(ul);
      h2.append('Suggested Artists');
      $("#suggestHead").html(h2);
      $("#suggest").html(div);
      $('.slider').slider();
             
    });
}


function lastFMGetArtistInfo(artist) {
	var lastFMGetArtistInfoURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=493f7a88030f6c7842e6bbf97ad8ce5e&format=json";

	$.get(lastFMGetArtistInfoURL)
		.done(function(response){
			var artInfo = response.artist.bio.summary;
			var p = $('<p> <i class="mdi-navigation-close right">');
			p.append(artInfo);
			$('#bio').html(p);
		})
}

// function spotifyArtistId(artist){
//   var spotifyArtistIdURL = 
// }
//button actions

$(".homeButton").on("click", function(event) {
  
  event.preventDefault();
  $("#index-banner").css("display", "block");
  $("#artistSearch").css("display", "none");
  $("#venueSearch").css("display", "none");
  $("#citySearch").css("display", "none");
  $("#cityResults").css("display", "none");
  $("#artistResults").css("display", "none");
  $("#venueResults").css("display", "none");
  $("#contact").css("display", "none");
  
  location.href = "#artistSearch";
   
});


$(".artButton").on("click", function(event) {
  
  event.preventDefault();
  $("#artistSearch").css("display", "block");
  $("#index-banner").css("display", "none");
  $("#venueSearch").css("display", "none");
  $("#venueResults").css("display", "none");
  $("#citySearch").css("display", "none");
  $("#cityResults").css("display", "none");
  $("#contact").css("display", "none");
  
  location.href = "#artistSearch";
   
});

$(".venButton").on("click", function(event) {
  
  event.preventDefault();
  $("#venueSearch").css("display", "block");
  $("#index-banner").css("display", "none");
  $("#artistSearch").css("display", "none");
  $("#citySearch").css("display", "none");
  $("#cityResults").css("display", "none");
  $("#venueResults").css("display", "none");
  $("#artistResults").css("display", "none");
  $("#contact").css("display", "none");
  
  location.href = "#venueSearch";
   
});

$(".citButton").on("click", function(event) {
  
  event.preventDefault();
  $("#citySearch").css("display", "block");
  $("#index-banner").css("display", "none");
  $("#artistSearch").css("display", "none");
  $("#venueSearch").css("display", "none");
  $("#artistResults").css("display", "none");
  $("#venueResults").css("display", "none");
  $("#contact").css("display", "none");
  
  location.href = "#citySearch";
   
});

$(".contButton").on("click", function(event) {
  
  event.preventDefault();
  $("#contact").css("display", "block");
  $("#index-banner").css("display", "none");
  $("#artistSearch").css("display", "none");
  $("#venueSearch").css("display", "none");
  $("#artistResults").css("display", "none");
  $("#citySearch").css("display", "none");
  $("#venueResults").css("display", "none");


 
  
  location.href = "#citySearch";
   
});
//


// Artist Search 
$(".searchBar").on("submit", function(event) {
  var artist = $(this).find('input').val().trim();

  event.preventDefault();
  // setTimout(function() {)
   

  $("#artist-table tbody").empty();
  $("#venue-table tbody").empty();

  // document.getElementById('header').style.display = "block";
  // document.getElementById('results').style.display = "block";
  // document.getElementById('initsearch').style.display = "none";
  
  getTourSchedule(artist);
  lastFMSearch(artist);
  lastFMGetSimilarArtists(artist);  
  lastFMGetArtistInfo(artist);
  $("#artistResults").css("display", "block");
  $("#venueResults").css("display", "none");
  $("#cityResults").css("display", "none");

  location.href = "#artistResults"; 

});

// Venue Search 
$(".vsearchBar").on("submit", function(event) {
  var venue = $(this).find('input').val().trim();

  event.preventDefault();
  // setTimout(function() {)
   

  $("#venue-table tbody").empty();
  $("#ven").empty();
  // document.getElementById('header').style.display = "block";
  // document.getElementById('results').style.display = "block";
  // document.getElementById('initsearch').style.display = "none";
  
  getVenue(venue);
  $("#venueResults").css("display", "block");
  $("#artistResults").css("display", "none");
  $("#cityResults").css("display", "none");

  location.href = "#venueResults"; 

});

// City Search
$(".csearchBar").on("submit", function(event) {
  var city = $(this).find('input').val().trim();

  event.preventDefault();
  // setTimout(function() {)
   

  $("#city-table tbody").empty();
  $("#cit").empty();
  // document.getElementById('header').style.display = "block";
  // document.getElementById('results').style.display = "block";
  // document.getElementById('initsearch').style.display = "none";
  
  getCity(city);
  $("#cityResults").css("display", "block");
  $("#artistResults").css("display", "none");
  $("#venueResults").css("display", "none");

  location.href = "#cityResults"; 

});

$('div').on('click','.sugPic', function(event) {
  var artist = $(this).attr("alt");

   event.preventDefault();
  location.href = "#artistResults";

  $("#artist-table tbody").empty();

  getTourSchedule(artist);
  lastFMSearch(artist);
  lastFMGetSimilarArtists(artist);  
  lastFMGetArtistInfo(artist);


});

}); // onReady end
