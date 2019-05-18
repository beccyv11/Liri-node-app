

require("dotenv").config();

var keys = require ("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require("axios");

var moment = require('moment');

var fs = require("fs");

var command = process.argv[2]

var spotify = new Spotify(keys.spotify);
var songName = process.argv.slice(3).join(" ");

switch(command) {
    case "spotify-this-song":
      runSpotify();
      break;
    case `movie-this`:
      runOmdb();
      break;
    case `concert-this`:
      runBand();
      break;
    case 'do-what-it-says':
      runText();
      break;
  }

function runSpotify(songName) {

spotify
.search({
 type: 'track', 
 query: 'songName'
 })
.then(function(response) {
  console.log(response.tracks.items);
})
.catch(function(err) {
  console.log(err);
});
}


function runOmdb () {

var movieName = process.argv.slice(3).join(" ");

if (movieName === ""){
    var movieName = "Mr. Nobody"
};

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios
    .get(queryUrl).then(
    function (response){
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.imdbRating);
        console.log(response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
});
}



function runBand () { 

var artist = process.argv.slice(3).join(" ");
    
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
axios 
    .get(queryUrl).then(
    function (response) {
        console.log(response.data[1].venue.name);
        console.log(response.data[1].venue.city);
        console.log(response.data[1].venue.country);
        console.log(moment(response.data[1].datetime).format('MM/DD/YYYY'));
});

}

function runText() { 

fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Break the string down by comma separation and store the contents into the output array.
  var output = data.split(",");

  // Loop Through the newly created output array
  for (var i = 0; i < output.length; i++) {

    // Print each element (item) of the array/
    console.log(output[i]);
  }
});
};