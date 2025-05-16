const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const Current = require('../models/Current'); 

router.get('/', async (req, res) => {
  try {
    const currentUser  = await Current.findOne(); 
    const watchlist = await Watchlist.findOne({ "movies.UserName": currentUser .name });
    res.json(watchlist ? watchlist.movies : []);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching watchlist' });
  }
});

router.post('/', async (req, res) => {
  try {
    const currentUser  = await Current.findOne();
    const watchlist = await Watchlist.findOne({ "movies.UserName": currentUser .name }) || new Watchlist();
    
    const movieWithUserName = {
      UserName: currentUser .name,
      ...req.body.movie
    };
    
    watchlist.movies.push(movieWithUserName);
    await watchlist.save();
    res.status(201).json(watchlist);
  } catch (error) {
    res.status(500).json({ error: 'Error adding movie to watchlist' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const currentUser  = await Current.findOne();
    const watchlist = await Watchlist.findOne({ "movies.UserName": currentUser .name });
    
    if (watchlist) {
      watchlist.movies = watchlist.movies.filter(movie => movie.imdbID !== req.params.id);
      await watchlist.save();
      res.status(200).json(watchlist);
    } else {
      res.status(404).json({ error: 'Watchlist not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting movie from watchlist' });
  }
});

module.exports = router;