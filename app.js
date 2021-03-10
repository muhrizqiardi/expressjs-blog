const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')

// Express app
const app = express();

// Connect to MongoDB
const db_URI =
    "isi_sendiri";
mongoose.connect(db_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Connected to DB :)");
        app.listen(3000);
    })
    .catch((err) => {
        console.log("An error happened :(");
        console.log(err);
    });

// Template engine = ejs
app.set('view engine', 'ejs')

//// Middleware and static files
app.use(morgan('dev')); // Morgan
app.use(express.urlencoded({ extended: true })) // urlEncoded
app.use(express.static('public')); // Static files
app.use('/blogs', blogRoutes); // Routes for blog

//// Routes
// Index page
app.get('/', (req, res) => {
    res.redirect('/blogs')
});

// About page
app.get('/about', (req, res) => {
    res.render('about', { title: "About me" })
});

// Redirect /about-me to /about
app.get('/about-me', (req, res) => {
    res.redirect('/about')
});

// 404 
app.use((req, res) => {
    res.status(404).render('404', { title: "Error" });
})
