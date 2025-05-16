const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/Index', (req, res) => {
    res.render('index', { title: 'Flix' });
});
app.get('/login', (req, res) => {
  res.render('login', { title: 'Flix' });
});
app.get('/movie', (req, res) => {
    res.render('movie', { title: 'Movies' });
});
app.get('/shows', (req, res) => {
    res.render('shows', { title: 'Shows' });
});
app.get('/gg', (req, res) => {
    res.render('gg', { title: 'Watchlist' });
});
app.get('/info', (req, res) => {
    res.render('info', { title: 'Movie Info' });
});
app.get('/cse4', (req, res) => {
    res.render('cse4', { title: 'Movie Playing' });
});
app.get('/plans', (req, res) => {
    res.render('plans', { title: 'Plans' });
});
app.get('/sign', (req, res) => {
    res.render('sign', { title: 'Sign In' });
});
app.get('/forgot', (req, res) => {
  res.render('forgot', { title: 'Forgot Password' });
});
app.get('/about_us', (req, res) => {
    res.render('about_us', { title: 'About Us' });
});
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});
app.get('/terms_of_use', (req, res) => {
    res.render('terms_of_use', { title: 'Terms of Use' });
});
app.get('/privacy_policy', (req, res) => {
    res.render('privacy_policy', { title: 'Privacy Policy' });
});
app.get('/faq', (req, res) => {
    res.render('faq', { title: 'FAQ' });
});
app.get('/modify', (req, res) => {
  res.render('modify', { title: 'Library' });
});
app.get('/msg', (req, res) => {
  res.render('msg', { title: 'Messages' });
});

const userdataRoutes = require('./routes/userdata');
app.use('/api', userdataRoutes);

const movieRoutes = require('./routes/movie'); 
app.use('/api/movie', movieRoutes); 

const contentRoutes = require('./routes/content');
app.use('/api/content', contentRoutes); 

const msgRoutes = require('./routes/msgs');
app.use('/api/msgs', msgRoutes);

const userRoutes = require('./routes/userdata');
app.use('/api/users', userRoutes);

const currentRoutes = require('./routes/current');
app.use('/api/current', currentRoutes);

const watchlistRoutes = require('./routes/watchlist');
app.use('/api/watchlist', watchlistRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});