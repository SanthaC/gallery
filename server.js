const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Determine DB URI
const dbURI = process.env.NODE_ENV === 'test'
  ? 'mongodb://localhost:27017/dark-test'
  : 'mongodb://localhost:27017/darkroom';

// Connect to MongoDB once
if (!mongoose.connection.readyState) {
  mongoose.connect(dbURI)
    .then(() => console.log('Connected to Database:', dbURI))
    .catch(err => console.error('DB connection error:', err));
}

app.get('/', async (req, res) => {
  const Image = mongoose.model('Image'); // or require your model
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;
