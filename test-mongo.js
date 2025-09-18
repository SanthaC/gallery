const mongoose = require('mongoose');
const config = require('./_config');

const MONGO_URI = config.mongoURI.development;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
