const mongoose = require("mongoose");
const config = require("./_config");

const MONGO_URI = config.mongoURI.development;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB Atlas!"))
  .catch(err => console.error("❌ Connection error:", err));
