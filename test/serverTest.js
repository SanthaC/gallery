process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // your Express app
const Image = require('../models/images'); // adjust path to your Image model
const should = chai.should();

chai.use(chaiHttp);

describe('Photos', function() {

    // Before running tests, populate test DB with sample image
    before(async function() {
        // Clear previous images
        await Image.deleteMany({});
        // Add a sample image
        await Image.create({ title: 'Test Image', url: 'test.jpg' });
    });

    it('should list ALL photos on / GET', function(done) {
        this.timeout(60000);
        chai.request(server)
            .get('/')
            .end(function(err, res) {
                if (err) return done(err);
                res.should.have.status(200);
                // Depending on your server response:
                res.body.should.be.a('array');
                res.body.length.should.be.above(0);
                done();
            });
    });

    // Optional: clean up after tests
    after(async function() {
        await Image.deleteMany({});
    });

});
