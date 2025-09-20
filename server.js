const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Suppress strictQuery warning
mongoose.set('strictQuery', false);

// Initializing the app
const app = express();

// connecting the database
const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env];
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Connected to Database: ${MONGODB_URI}`);
    }
});

// View Engine
app.set('view engine', 'ejs');

// Set up public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));
app.use('/image', require('./routes/image'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});

module.exports = app;
