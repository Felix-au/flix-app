const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  movies: [{
    UserName: String, 
    Title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
  }]
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);