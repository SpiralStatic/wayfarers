var Location = require('../models/location');

function indexLocations(req, res) {
    Location.find({}, function(err, locations) {

    // Check for errors and return 500 if there is a problem
    if (err) return res.status(500).send(err.message);

    // Data return so now we can render
    res.status(200).render("locations/index", {
        title: "Fables",
        locations: locations
    });
});
}

function showLocation(req, res) {
    // Get the location to load a single post from its mongo id
    Location.findById(req.params.id, function(err, location) {

        // Check to see if post is returned
        if (!location) return res.status(404).send("Location Not Found");

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        res.status(200).render("locations/show", {
            title: "Chapter",
            location: location
        });
    });
}

function newLocation(req, res) {
    // Create an empty Location
    var newLocation = {
            name: "",
            description: ""
    };

    res.render("locations/new", {
        title: "Add a Chapter",
        location: newLocation
    });
}

function editLocation(req, res) {
    Location.findById(req.params.id, function(err, location) {

        // Check to see if post is returned
        if (!location) return res.status(404).send("Not Found");

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        res.render("locations/edit", {
            title: "Rewrite Chapter",
            location: location
        });
    });
}

function createLocation(req, res) {
    Location.create(req.body, function(err, location) {
        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect("/");
    });
}

function updateLocation(req, res) {
    Location.findByIdAndUpdate(req.params.id, req.body, function(err, location) {

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect("/");
    });
}

function deleteLocation(req, res) {
    Location.findByIdAndRemove(req.params.id, function(err, location) {

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect to a GET request
        res.redirect("/");
    });
}

module.exports = {
    index: indexLocations,
    show: showLocation,
    new: newLocation,
    edit: editLocation,
    create: createLocation,
    update: updateLocation,
    delete: deleteLocation
};
