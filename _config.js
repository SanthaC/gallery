var config = {}

// Updated with your actual MongoDB Atlas connection string
config.mongoURI = {
    production: 'mongodb+srv://santha:cheru235@milestone-1.lritrnz.mongodb.net/darkroom?retryWrites=true&w=majority&appName=Milestone-1',
    development: 'mongodb+srv://santha:cheru235@milestone-1.lritrnz.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=Milestone-1',
    test: 'mongodb+srv://santha:cheru235@milestone-1.lritrnz.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=Milestone-1',
}

module.exports = config;
