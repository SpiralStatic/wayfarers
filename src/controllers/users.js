var User = require('../models/user');

function indexUserLocations(req, res) {
    User.findById(req.user.id)
        .populate('locations')
        .exec(function(err, user) {
            // check for errors and return 500 error and message if found
            if (err) return res.status(500).send(err);

            // data return so now we can render
            res.render('users/index', {
                title: "Your Chapters",
                locations: user.locations
        });
    });
}

function newUser(req, res) {
    res.render('users/new', {
        title: "Register",
    });
}

function editUser(req, res) {
    User.findById(req.params.id, function(err, user) {
        // Check to see if post is returned
        if (!user) return res.status(404).send("Not Found");

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        res.render('users/edit', {
            title: "Edit Profile",
            user: user
        });
    });
}

function createUser(req, res) {
    User.create(req.body, function(err, user) {
        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect('/');
    });
}

function updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect('/users');
    });
}

function deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect to a GET request
        res.redirect('/');
    });
}

module.exports = {
    index: indexUserLocations,
    new: newUser,
    edit: editUser,
    create: createUser,
    update: updateUser,
    delete: deleteUser
};
