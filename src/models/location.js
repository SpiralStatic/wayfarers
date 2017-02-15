var mongoose = require('mongoose');

// Create a new schema
var locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    Longitude: {
        type: Number,
        min: -180,
        max: 180
    },
    Latitude: {
        type: Number,
        min: -90,
        max: 90
    },
    images: [{
        type: String
    }]
});

// Tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Location', locationSchema);
