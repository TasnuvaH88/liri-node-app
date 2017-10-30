var keys = require("./keys");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var Twitter = require('twitter');
var omdb = require('omdb');
var userInput = process.argv;
var title = userInput[3];
var request = require('request');

var client = new Twitter({
    consumer_key: 'ata5moFnh6u7WVu2T6QnKIrYd',
    consumer_secret: 'wYJaHriiEBhqTXMpzaQAXUfa9L60DuI30ycjGTYSwpsDRluo64',
    access_token_key: '906052132725456896-8U1XAhkF6U7qG4yhXUC0LMKR05VgFJ7',
    access_token_secret: '2M8vcn3p4jBj30ILytCBCLJh20hrYRsh2fHB646M9ihHN'
});

var params = {screen_name: '@HudaTaz'};
if (userInput[2] === "my-tweets") {
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
   
      for (var i=0; i<tweets.length; i++){
       console.log(tweets[i].text + " " + tweets[i].created_at);
      }
      }
   })
};


var spotify = new Spotify({
    id: "1a4d75ad0430433290057a041fc9ab38",
    secret: "82029984dc78445883822a4db336303b"
});

 

function spotifythis(title) {
    if (typeof title === 'undefined') {
        title = "the sign"
     }
    spotify.search({ type: 'track', query: title}, function(err, data) {
        
    if (err) {
       return console.log('Error occurred: ' + err);

    } 

     console.log("*****SEARCH RESULTS******")
         
     for (var i=0; i<data.tracks.items.length; i++) {
     console.log("Artist: " + data.tracks.items[i].artists[0].name)
     console.log("Title: " + data.tracks.items[i].name)
     console.log("Preview URL: " + data.tracks.items[i].preview_url) 
     console.log("Album: " + data.tracks.items[i].album.name + "\n")
    }
        
   })

}

if (userInput[2] === "spotify-this-song") { 
    spotifythis() 
};

var movieName = "";
 
if (userInput[2] === "movie-this") {
   for (var i = 3; i < userInput.length; i++) {
      if (i > 3 && i < userInput.length) {
      movieName = movieName + "+" + userInput[i];
      }
      else {
      movieName += userInput[i];
      }
   }
 
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
 
  request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
      var resultof = JSON.parse(body)
      console.log("Title: " + resultof.Title + "\nYear: " + resultof.Year)
      console.log("Rotten Tomatoes Rating: " + resultof.Ratings[2].Value)
      console.log("IMDB Rating: " + resultof.Ratings[1].Value)
      console.log("Actors: " + resultof.Actors)
      console.log("Plot: " + resultof.Plot)
      console.log("Country: " + resultof.Country)
      console.log("Language: " + resultof.Language)
      }
  })
};

if (userInput[2] === "do-what-it-says") 
{
   fs.readFile("random.txt", "utf8", function(error, data)
   {
        if (error) {
        return console.log(error);
        }
        var dataArr = data.split(",")
        title = dataArr[1]
        spotifythis(title)  
    })
};