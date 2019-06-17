require("dotenv").config();

var keys = require("./keys.js");
var nodeSpotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var moment = require("moment");
moment().format();

var axios = require("axios");

var fs = require("fs");

var command = process.argv[2];
var value = process.argv[3];

if(command === "concert-this") {
	concertThis(value);
} else if(command === "spotify-this-song") {
	spotifyThisSong(value);
} else if(command === "movie-this") {
	movieThis(value);
} else if(command === "do-what-it-says") {
    doIt(value);
};

// 1. node liri.js concert-this <artist/band name here>

function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime;
            var dateArr = datetime.split('T');

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY");
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}


// 2. node liri.js spotify-this-song '<song name here>'

function spotifyThisSong(value) {
    if(!value){
        value = "The Sign";
    }
    spotify
    .search({ type: 'track', query: value })
    .then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "--------------------------------------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
            console.log(spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

// 3. node liri.js movie-this '<movie name here>'

function movieThis(value) {
    if(!value) {
        value = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nTitle of the Movie: " + response.data.Title + 
                    "\nYear Released: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry in Which Movie Was Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

// 4. node liri.js do-what-it-says

function doIt(value) {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        spotifyThisSong(dataArr[0], dataArr[1]);
    })
}
