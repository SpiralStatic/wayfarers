var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = require('chai').expect;
var Location = require('../models/location');

chai.use(chaiHttp);

xdescribe('Location', function() {
    var location = new Location({
        name: "Cornwall",
        date: new Date("2014-09-21"),
        description: "Great few days surfing the waves",
        longitude: 50.576492,
        latitude: -4.908804,
        images: ["image1", "image2"]
    });

    beforeEach(function(done) {
        location.save(function(err, newLocation) {
            if (err) return console.log(err);
            location._id = newLocation._id;
            done();
        });
    });

    afterEach(function(done) {
        Location.findByIdAndRemove(location._id, function(err) {
            if (err) return console.log(err);
            done();
        });
    });

    // locations /GET/:id
    it('Should list a SINGLE location on /<id> GET', function(done) {
        chai.request(app)
            .get('/' + location._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Chapter/);
                res.text.should.match(/Cornwall/);
                res.text.should.match(/<img src="image1"/);
                res.text.should.match(/<img src="image2"/);
                done();
            });
    });

    // locations /PUT/:id
    it('Should update a SINGLE location on /<id> PUT', function(done) {
        var request = chai.request(app);
        request.put('/' + location._id)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                description: "Had a blast exploring Cornwall",
                images: ["image1", "image2", "image3"]
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Fables/);
                request
                    .get('/' + location._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.html;
                        res.text.should.match(/Chapter/);
                        res.text.should.match(/Had a blast exploring Cornwall/);
                        done();
                    });
            });
    });

    // locations /GET
    it('Should list ALL locations on / GET', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Fables/);
                res.text.should.match(/York/);
                res.text.should.match(/<img src="http:\/\/angelstravelandtours.com\/wp-content\/uploads\/2014\/05\/york-1.jpg"/);
                done();
            });
    });

    // locations /POST
    it('Should add a SINGLE location on / POST', function(done) {
        var request = chai.request(app);
        request.post('/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                name: "Snowdonia",
                date: new Date("2015-05-11"),
                description: "Great weekend hiking",
                longitude: 53.123158,
                latitude: -3.993747,
                images: ["image1", "image2"]
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Fables/);
                Location.findOne({"name": "Snowdonia"}, function(err, thisLocation) {
                    request
                        .get('/' + thisLocation._id)
                        .end(function(err, res) {
                            res.should.have.status(200);
                            res.should.be.html;
                            res.text.should.match(/Chapter/);
                            res.text.should.match(/Snowdonia/);

                            Location.findByIdAndRemove(thisLocation.id, function(err) {
                                if (err) return console.log(err);
                                done();
                            });
                        });
                });

            });
    });

    // locations /DELETE/:id
    it('Should delete a SINGLE location on /<id> DELETE', function(done) {
        var request = chai.request(app);
        request.delete('/' + location._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Fables/);
                request
                    .get('/' + location._id)
                    .end(function(err, res) {
                        res.should.have.status(404);
                        done();
                    });
            });
    });
});
