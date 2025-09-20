const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
<<<<<<< HEAD
const config = require('./_config'); // your Atlas URIs
=======
const config = require('./_config');
>>>>>>> test

// Suppress strictQuery warning
mongoose.set('strictQuery', false);

<<<<<<< HEAD
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
=======
// Initializing the app
const app = express();

// connecting the database

const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env]
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
    if (err) {
        console.log(err)
    }else{
        console.log(`Connected to Database: ${MONGODB_URI}`)
    }
});

// test if the database has connected successfully
// let db = mongoose.connection;
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })


>>>>>>> test

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
<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
=======
app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});


module.exports = app;
>>>>>>> test
