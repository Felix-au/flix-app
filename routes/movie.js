const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
});

router.post('/', async (req, res) => {
    try {
        const sanitizedData = {
            ...req.body,
            Metascore: req.body.Metascore || "N/A",
            imdbRating: req.body.imdbRating || "N/A",
            imdbVotes: req.body.imdbVotes || "N/A",
            ComingSoon: req.body.ComingSoon || false
        };
        const newMovie = new Movie(sanitizedData);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        console.error('Error creating movie:', err.message);
        res.status(400).json({ error: 'Failed to create movie', details: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update movie' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete movie' });
    }
});

module.exports = router;