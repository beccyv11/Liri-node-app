

require("dotenv").config();

var keys = require ("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require("axios");

var moment = require('moment');

var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var divider = "\n------------------------------------------------------------\n\n";



var runSpotify = function(songName) {
    if (songName === ""){
        var songName = "The Sign"
    };
spotify
.search({
 type: 'track' , 
 query: songName
 })
.then(function(response) {
    var jsonData = response.tracks.items[0];
    var showData = [
        "Artist: " + jsonData.artists[0].name,
        "Song Name: " + songName,
        "Preview Link" + jsonData.preview_url,
        "Album Name: " + jsonData.album.name, 
      ].join("\n\n");

      fs.appendFile("log.txt", showData + divider, function(err) {
        if (err) throw err;
        console.log(showData);
      })
    });
};

var runOmdb = function(movieName) {

if (movieName === ""){
    var movieName = "Mr. Nobody"
};


// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios
    .get(queryUrl).then(
    function (response){
        var movieData=response.data;
        var showData = [
            "Title: " + movieData.Title,
            "Release Year " + movieData.Year,
            "imdb Rating" + movieData.imdbRating,
            "Rotten Tomato Rating: " + movieData.Ratings[1].Value, 
            "Country: " + movieData.Country,
            "Language:" + movieData.Language,
            "Plot:" + movieData.Plot, 
            "Actors: " + movieData.Actors
          ].join("\n\n");
          fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
            console.log(showData);
        });
       
});
}



var runBand = function(artist) { 
    
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
axios 
    .get(queryUrl).then(
    function (response) {
        var concertData=response.data[1];
        var showData = [
            "Venue: " + concertData.venue.name,
            "City: " + concertData.venue.city,
            "Country:" + concertData.venue.country,
            "Date: " + (moment(concertData.datetime).format('MM/DD/YYYY'))
          ].join("\n\n");
          fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
            console.log(showData);
        });
    
});

}

var runText = function() { 

fs.readFile("random.txt", "utf8", function(error, data) {
  console.log(data);
  // Break the string down by comma separation and store the contents into the output array.
  var dataArr = data.split(",");

  // Loop Through the newly created output array
  if (dataArr.length ===2 ){
      pick(dataArr[0], dataArr[1]);
  }
  else if (dataArr.length === 1){
      pick(dataArr[0]);
  }
});
};

var pick = function (command, fucntionData){
    switch(command) {
        case "spotify-this-song":
          runSpotify(fucntionData);
          break;
        case `movie-this`:
          runOmdb(fucntionData);
          break;
        case `concert-this`:
          runBand(fucntionData);
          break;
        case 'do-what-it-says':
          runText();
          break;
        default:
            console.log("Liri doesn't know that");
      };
    };

var start = function (argOne, argTwo) {
    pick(argOne, argTwo); 
};

start(process.argv[2], process.argv.slice(3).join(""));