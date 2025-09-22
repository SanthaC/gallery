process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // make sure server.js exports the Express app
const Image = require('../models/images'); 
const should = chai.should();

chai.use(chaiHttp);

describe('Photos', function() {
    let serverInstance;

    // Increase timeout for async DB ops
    this.timeout(10000); // 10 seconds

    // Start server and prepare test DB
    before(async function() {
        // Start server on a test port
        serverInstance = app.listen(4000); // pick a port not in use

        // Clear previous images
        await Image.deleteMany({});
        // Add a sample image
        await Image.create({ title: 'Test Image', url: 'test.jpg' });
    });

    it('should list ALL photos on / GET', async function() {
        const res = await chai.request(serverInstance).get('/');
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.above(0);
    });

    // Clean up DB and close server
    after(async function() {
        await Image.deleteMany({});
        serverInstance.close();
    });
});
