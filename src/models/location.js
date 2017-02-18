var mongoose = require('mongoose');

function validateBannedWords(value) {
    var bannedWords = ['fuck', 'shit', 'twat'];
    // Check for each banned word in the body text
    var word = null;
    while (word = bannedWords.pop()) {
        if (value.toLowerCase().indexOf(word) !== -1) return false;
    }
    // None were found, you passed!
    return true;
}

// Create a new schema
var locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: validateBannedWords,
            message: "Please use non-offensive vocabulary"
        }
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        maxlength: 500
    },
    latitude: {
        type: Number,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        min: -180,
        max: 180
    },
    images: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Location', locationSchema);
