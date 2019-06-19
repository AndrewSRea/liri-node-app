# LIRI-Bot (liri-node-app)

Creating a LIRI-Bot using JavaScript and node.js. LIRI-Bot is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and 
Recognition Interface, LIRI-Bot is a Language Interpretation and Recognition Interface. LIRI-Bot will be a command line node app that 
takes in parameters and gives you back data.

LIRI-Bot will take your commands on the command line in Terminal (Bash) to search for music concerts, songs, and movies by typing the following commands:

`node liri.js concert-this <artist/band name>` 
This will search the BandsInTown.com for an artist and render the following information:

* Name of the venue
* Venue location
* Date of the event

![Image of the concert-this command] (images/concert-image.jpg)

`node liri.js spotify-this-song <song name>`
This will search the Spotify app for a specific song and render the following information:
 
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

![Image of the spotify-this-song command] (images/spotify-image.jpg)

`node liri.js movie-this <movie name>`
This will search the OMDB App for a movie and render the following information:

* Title of the movie
* The year the movie was released
* OMDB rating of the movie
* Rotten Tomatoes rating of the movie
* Country in which the movie was produced
* Language of the movie
* Plot of the movie
* Actors/Actresses in the movie

![Image of the movie-this command] (images/movie-image.jpg)

Also, typing `node liri.js do-what-it-says` will run a random command on the Terminal.

![Image of the do-what-it-says command] (images/do-what-it-says.jpg)

Have fun!
