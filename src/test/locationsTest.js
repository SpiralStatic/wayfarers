var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = require('chai').expect;
var Location = require('../models/location');

chai.use(chaiHttp);

describe('Location', function() {
    var location = new Location({
        name: "Cornwall",
        date: new Date("2014-09-21"),
        description: "Great fews days surfing the waves",
        longitude: 34.2498237739,
        latitude: 78.89847897381,
        images: ["image1", "image2"]
    });

    beforeEach(function() {
        location.save(function(err, newLocation) {
            if (err) return console.log(err);
            location.id = newLocation.id;
        });
    });

    afterEach(function() {
        Location.findByIdAndRemove(location.id, function(err) {
            if (err) return console.log(err);
        });
    });

    // locations /GET
    it('Should list ALL locations on / GET', function(done) {
        var request = chai.request(app);
        request
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Fables/);
                res.text.should.match(/Cornwall/);
                done();
            });
    });

    // locations /GET/:id
    it('Should list a SINGLE location on /<id> GET', function(done) {
        chai.request(app)
            .get('/' + location.id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Cornwall/);
                done();
            });
    });

    // locations /POST
    it('Should add a SINGLE location on / POST', function(done) {
        var request = chai.request(app);
        request.post('/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                _id: 12345,
                name: "Snowdonia",
                date: new Date("2015-05-11"),
                description: "Great weekend hiking",
                longitude: 35.93485730194,
                latitude: 68.89847897381,
                images: ["image1", "image2"]
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Fables/);
                request
                    .get('/12345')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.html;
                        res.text.should.match(/Chapter/);
                        res.text.should.match(/Snowdonia/);

                        Location.findByIdAndRemove(12345, function(err) {
                            if (err) return console.log(err);
                            done();
                        });
                    });
            });
    });

    // locations /PUT/:id
    it('Should update a SINGLE location on /<id> PUT', function(done) {
        var request = chai.request(app);
        request.put('/' + location.id)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                description: "Had a blast exploring Cornwall",
                images: ["image1", "image2", "image3"]
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/All locations/);
                request
                    .get('/' + location.id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.html;
                        res.text.should.match(/Chapter/);
                        res.text.should.match(/Had a blast exploring Cornwall/);
                        done();
                    });
            });
    });

    // locations /DELETE/:id
    it('Should delete a SINGLE location on /<id> DELETE', function(done) {
        var request = chai.request(app);
        request.delete('/' + location.id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Fables/);
                request
                    .get('/' + location.id)
                    .end(function(err, res) {
                        res.should.have.status(404);
                        done();
                    });
            });
    });
});
