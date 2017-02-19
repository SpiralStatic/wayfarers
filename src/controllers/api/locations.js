var Location = require('../../models/location');
var User = require('../../models/user');
var masterKey = require('../../master');

// INDEX - GET /
function indexLocation(req, res) {
    // Get the model to load all the locations. wait for data in the callback
    Location.find({}, function(err, locations) {
        if (err) res.status(500).json({
            error: err.message
        });
        // Return locations as JSON object
        res.status(200).json(locations);
    });
}

// SHOW - GET /:id
function showLocation(req, res) {

    Location.findById(req.params.id, function(err, location) {
        // check for errors or for no object found
        if (!location) res.status(404).json({
            error: "Chapter not found"
        });
        if (err) res.status(500).json({
            error: err.message
        });
        // Return location as JSON object
        res.status(200).json(location);
    });
}

// DELETE - DELETE /:id
function deleteLocation(req, res) {
    // Tell the data store to remove the location with the id in the request
    Location.findByIdAndRemove(req.params.id, function(err, location) {
        // Check user permissions
        if(location.user !== req.query.key) {
            res.status(401).json({
                error: "You do not have the correct API key to delete this content"
            });
        }

        if (err) res.status(500).json({
            error: err.message
        });
        User.findByIdAndUpdate(req.query.key, {
                $pull: {
                    locations: {
                        _id: location.id
                    }
                }
            },
            function(err, user) {
                // Check for errors and return 500 if there was a problem
                if (err) res.status(500).json({
                    error: err.message
                });
                // Return completion message
                res.status(204).json({
                    message: "Successful deletion"
                });
            });
    });
}

// UPDATE - UPDATE /:id
function updateLocation(req, res) {
    // Update with new content
    Location.findByIdAndUpdate(
        req.params.id, {
            $set: req.body
        }, {
            runValidators: true
        },
        function(err, location) {
            // Check user permissions
            if(location.user !== req.query.key || req.query.key !== masterKey.key) {
                res.status(401).json({
                    error: "You do not have the correct API key to update this content"
                });
            }

            if (err) res.status(500).json({
                error: err.message
            });
            // Return updated location as JSON object
            res.status(204).json(location);
        }
    );
}

// CREATE - POST /
function createLocation(req, res) {
    // Ask mongoose to save the data for us and wait for the response
    Location.create({
        "name": req.body.name,
        "date": req.body.date,
        "description": req.body.description,
        "latitude": req.body.latitude,
        "longitude": req.body.longitude,
        "images": req.body.images,
        "user": req.query.key

    }, function(err, location) {
        // Check for errors and return 500 if there was a problem
        if (err) res.status(500).json({
            error: err.message
        });

        User.findByIdAndUpdate(req.query.key, {
                $addToSet: {
                    locations: location
                }
            },
            function(err, user) {
                // Check for errors and return 500 if there was a problem
                if (err) res.status(500).json({
                    error: err.message
                });
                // Return newly created location as JSON object
                res.status(201).json({
                    message: "Successfully created",
                    location: location
                });
            }
        );
    });
}

// Export all our controller functions in an object
module.exports = {
    index: indexLocation,
    show: showLocation,
    delete: deleteLocation,
    update: updateLocation,
    create: createLocation
};
