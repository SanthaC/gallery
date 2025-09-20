const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config'); // your Atlas URIs

// Suppress strictQuery warning
mongoose.set('strictQuery', false);

// Connect to MongoDB Atlas using callback (Mongoose v6)
mongoose.connect(config.mongoURI.development, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.error('❌ MongoDB connection error:', err);
  } else {
    console.log('✅ Connected to MongoDB Atlas!');
  }
});

// Initialize Express app
const app = express();

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
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
