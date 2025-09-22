const express = require('express');
const mongoose = require('mongoose');
const config = require('./_config');
const Image = require('./models/images');

const app = express();

// Pick DB URI depending on environment
const env = process.env.NODE_ENV || 'development';
const dbURI = config.mongoURI[env];

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to Database:', dbURI))
  .catch(err => console.error('❌ DB connection error:', err));

// Simple route
app.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).send('Internal Server Error');
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
