var mongoose = require('mongoose');

// Create a new schema
var locationSchema = mongoose.Schema({
    location: String
});

// Tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Location', locationSchema);
