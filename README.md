Dark Room – Milestone 1 Setup

This README outlines the steps taken to achieve Milestone 1: forking the repository, setting up a MongoDB Atlas cluster, and connecting it to the project.

1. Fork and Clone the Repository

Go to the GitHub repository page for the project.

Click Fork in the top-right corner to create your own copy.

Clone the forked repo locally:

git clone https://github.com/<your-username>/<repo>.git
cd <repo>

2. Create a MongoDB Atlas Cluster

Sign in to MongoDB Atlas

Create a free shared cluster.

Add a database user:

Username: <username>

Password: <password>

Assign the role: atlasAdmin

Add your IP to the cluster’s whitelist:

Either your public IP or 0.0.0.0/0 (allows access from any IP)

Copy the connection string for your cluster. It should look like:

mongodb+srv://<username>:<password>@milestone-1.lritrnz.mongodb.net/darkroom-dev?retryWrites=true&w=majority

3. Update _config.js

Update _config.js to include your Atlas URI for example:

var config = {}

config.mongoURI = {
  development: 'mongodb+srv://santha:1234@milestone-1.lritrnz.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
  production: 'mongodb+srv://santha:1234@milestone-1.lritrnz.mongodb.net/darkroom?retryWrites=true&w=majority',
  test: 'mongodb+srv://santha:1234@milestone-1.lritrnz.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}

module.exports = config;


Tip: In production, it’s better to use environment variables instead of hardcoding credentials.

4. Verify MongoDB Atlas Connection

Create test-mongo.js:

const mongoose = require('mongoose');
const config = require('./_config');

mongoose.connect(config.mongoURI.development, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas!'))
.catch((err) => console.error('❌ Connection error:', err));


Run:

node test-mongo.js


You should see:

✅ Connected to MongoDB Atlas!

5. Update server.js for Atlas & Mongoose v6

Suppress strictQuery warnings:

mongoose.set('strictQuery', false);


Use Atlas URI instead of localhost:

const config = require('./_config');
mongoose.connect(config.mongoURI.development, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) console.log('❌ MongoDB connection error:', err);
  else console.log('✅ Connected to MongoDB Atlas!');
});


Ensure routes, middleware, and EJS view engine are set up correctly.

6. Start the Server

Run:

npm install         # install dependencies
npm start           # start server


Expected output:

✅ Connected to MongoDB Atlas!
🚀 Server is listening at http://localhost:5000

7. Test the Application

Open your browser and go to:

http://localhost:5000


Upload an image via the form.

Verify that the image appears in your gallery and is stored in MongoDB Atlas.

✅ Milestone 1 Achievements

Forked and cloned the GitHub repository.

Created a MongoDB Atlas cluster and whitelisted IP addresses.

Created a database user and copied the connection string.

Updated _config.js to use Atlas URI.

Verified connection with test-mongo.js.

Updated server.js for Atlas, Mongoose v6 compatibility, and suppressed warnings.

Successfully ran the application and uploaded images.