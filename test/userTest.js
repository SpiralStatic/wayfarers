var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = require('chai').expect;
var User = require('../models/user');

chai.use(chaiHttp);

describe('User', function() {
    var user = new User({
        firstname: "James",
        lastname: "Harris",
        email: "jamieh@gmail.com",
        password: "password"
    });

    beforeEach(function(done) {
        user.save(function(err, newUser) {
            if (err) return console.log(err);
            user._id = newUser._id;
            done();
        });
    });

    afterEach(function(done) {
        User.findByIdAndRemove(user._id, function(err) {
            if (err) return console.log(err);
            done();
        });
    });

    // users /PUT/users/:id
    it('Should update a SINGLE user on /<id> PUT', function(done) {
        var request = chai.request(app);
        request.put('/users/' + user._id)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: "jamesharris@gmail.com"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Edit Profile/);
                request
                    .get('/users/' + user._id + '/edit')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.html;
                        res.text.should.match(/Edit Profile/);
                        res.text.should.match(/jamesharris@gmail.com/);
                        done();
                    });
            });
    });

    // users /GET/users
    it('Should list ALL user locations on / GET', function(done) {
        chai.request(app)
            .get('/users')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Your Chapters/);
                res.text.should.match(/York/);
                done();
            });
    });

    // users /POST/users
    it('Should add a SINGLE user on / POST', function(done) {
        var request = chai.request(app);
        request.post('/users')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                firstname: "Michelle",
                lastname: "Rowan",
                email: "miky@gmail.com",
                password: "password"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Fables/);
                User.findOne({
                    "firstname": "Rowan"
                }, function(err, thisUser) {
                    request
                        .get('/users/' + thisUser._id + '/edit')
                        .end(function(err, res) {
                            res.should.have.status(200);
                            res.should.be.html;
                            res.text.should.match(/Edit Profile/);
                            res.text.should.match(/Rowan/);

                            User.findByIdAndRemove(thisUser.id, function(err) {
                                if (err) return console.log(err);
                                done();
                            });
                        });
                });

            });
    });

    // users /DELETE/users/:id
    it('Should delete a SINGLE user on /<id> DELETE', function(done) {
        var request = chai.request(app);
        request.delete('/users/' + user._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                res.text.should.match(/Edit Profile/);
                request
                    .get('/' + user._id + '/edit')
                    .end(function(err, res) {
                        res.should.have.status(404);
                        done();
                    });
            });
    });
});
