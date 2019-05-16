

require("dotenv").config();



// * `spotify-this-song`

var keys = require ("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

// * `movie-this`
var axios = require("axios");


var movieName = process.argv[2];


// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


console.log(queryUrl);

axios
    .get(queryUrl).then(
    function (response){
        // console.log(response.data);
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.imdbRating);
        console.log(response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
});

// * `concert-this`

var moment = require('moment');
var axios = require("axios");

var artist = process.argv[2];
    
var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
console.log(queryUrl);

axios 
    .get(queryUrl).then(
    function (response) {
        console.log(response.data[1].venue.name);
        console.log(response.data[1].venue.city);
        console.log(response.data[1].venue.country);
        console.log(moment(response.data[1].datetime).format('MM/DD/YYYY'));
});

// * `do-what-it-says`

