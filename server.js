const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // <-- add this
const config = require('./_config');
const Image = require('./models/images');

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // make sure your index.ejs is in /views

// Serve static files (for images and CSS)
app.use(express.static(path.join(__dirname, 'public'))); 
// if your images are in /public/images and CSS in /public/css

// Pick DB URI depending on environment
const env = process.env.NODE_ENV || 'development';
const dbURI = config.mongoURI[env];

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to Database:', dbURI))
  .catch(err => console.error('❌ DB connection error:', err));

// Root route — render EJS template instead of sending JSON
app.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.render('index', { images }); // ✅ render index.ejs
  } catch (err) {
    console.error('Error fetching images:', err);
    res.render('index', { images: [], msg: 'Failed to load images' });
  }
});

// Export app for tests
module.exports = app;

// Only start server if file is run directly (not required by tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
