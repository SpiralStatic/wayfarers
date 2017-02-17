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
var userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        validate: {
            validator: validateBannedWords,
            message: "Please use non-offensive vocabulary"
        }
    },
    lastname: {
        type: String,
        required: true,
        validate: {
            validator: validateBannedWords,
            message: "Please use non-offensive vocabulary"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }]
});

// Tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('User', userSchema);
