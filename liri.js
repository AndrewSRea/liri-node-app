require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var command = process.argv[2];
var arg = process.argv;
var reference = [];
var fileName = "log.txt";
var fullCommand = [];

for (var i = 3; i < arg.length; i++) {
    reference.push(arg[i]);
}

var referenceBand = reference.join("");

fullCommand.push(command);
if(reference.length !=0) {
    fullCommand.push(referenceBand);
}

function logging(value) {
    fs.appendFile(fileName, "," + value, function(err) {
        if (err) {
            return console.log("You received an error.");
        }
    })
}

logging(fullCommand)

if(command === "concert-this") {
	concertThis(referenceBand);
} else if(command === "spotify-this-song") {
	spotifyThisSong(reference);
} else if(command === "movie-this") {
	movieThis(reference);
} else if(command === "do-what-it-says") {
    doIt();
};

// 1. node liri.js concert-this <artist/band name here>

function concertThis(referenceBand) {
    var bandURL = "https://rest.bandsintown.com/artists/" + referenceBand + "/events?app_id=codingbootcamp";
    axios.get(bandURL).then(
        function(response) {    
            console.log("  ");
            console.log("GETTING THE BAND/ARTIST INFORMATION: " + referenceBand);
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
            console.log("This is an " + error);
    });
}


// 2. node liri.js spotify-this-song '<song name here>'

function spotifyThisSong(reference) {
    if(!reference.length === 0){
        reference = "The Sign";
    }
    spotify
    .search({ type: 'track', query: reference })
    .then(function(response) {
        console.log(" ");
        console.log("SEARCHING SPOTIFY FOR: " + reference);
        console.log(" ");
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

function movieThis(reference) {
    if(reference.length === 0) {
        reference = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + reference + "&y=&plot=short&apikey=trilogy")
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
<<<<<<< HEAD

//Commands: concert-this; spotify-this-song; movie-this; do-what-it-says; will run functions when typed in Terminal
//node liri.js concert-this <artist/band name here> will search the Bands In Town Events API 
//("https://rest.bandsintown.com/artists/" + artist + "events?app_id=codingbootcamp") for an artist and render the following info about each event to the Terminal:
//1) name of venue; 2) venue location; 3) date of the event (use moment to format this as "MM/DD/YYYY")

//node liri.js spotify-this-song '<song name here>' will show the following info about the song in your Terminal:
//1) artist; 2) song's name; 3) a preview link of the song from Spotify; 4) the album that the song is from;
//(If no song is provided, then program will default to "The Sign" from Ace of Base.) [Read steps for Spotify API.]
=======
>>>>>>> 76a6e07d6a35f2af80acbc729b974659c90abb93
