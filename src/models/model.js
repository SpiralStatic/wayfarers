var mongoose = require('mongoose');

// Create a new schema
var modelSchema = mongoose.Schema({
    model: String
});

// Tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Model', modelSchema);
