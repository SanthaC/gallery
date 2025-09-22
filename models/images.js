const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const imageSchema = new Schema({
  name: String,
  path: String,
  size: Number,
  date: { type: Date, default: Date.now }  // ✅ fixed default
});

// Create model
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
