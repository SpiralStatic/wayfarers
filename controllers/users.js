var User = require('../models/user');

function indexUserLocations(req, res) {
    User.findById(req.user.id)
        .populate('locations')
        .exec(function(err, user) {
            // check for errors and return 500 error and message if found
            if (err) req.flash('error', err.message);

            // data return so now we can render
            res.render('users/index', {
                header: {
                    title: "Your Chapters"
                },
                locations: user.locations
        });
    });
}

function newUser(req, res) {
    res.render('users/new', {
        header: {
            title: "Register"
        },
        user: {
            id: ""
        }
    });
}

function editUser(req, res) {
    User.findById(req.params.id, function(err, user) {
        // Check to see if post is returned
        if (!user) req.flash('error', "Location not found");

        // Check for errors and return 500 if there is a problem
        if (err) req.flash('error', err.message);

        res.render('users/edit', {
            header: {
                title: "Edit Profile"
            },
            user: user
        });
    });
}

function createUser(req, res) {
    User.create(req.body, function(err, user) {
        // Check for errors and return 500 if there is a problem
        if (err) req.flash('error', err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect('/sessions/new');
    });
}

function updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
        // Check for errors and return 500 if there is a problem
        if (err) req.flash('error', err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect('/users');
    });
}

function deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        // Check for errors and return 500 if there is a problem
        if (err) req.flash('error', err.message);

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
