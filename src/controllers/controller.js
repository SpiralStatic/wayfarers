var Model = require('../models/model');

function indexModels(req, res) {
    Model.find({}, function(err, models) {

    // Check for errors and return 500 if there is a problem
    if (err) return res.status(500).send(err.message);

    // Data return so now we can render
    res.render("models/index", {
        title: "Models",
        models: models
    });
});
}

function showModel(req, res) {
    // Get the model to load a single post from its mongo id
    Model.findById(req.params.id, function(err, model) {

        // Check to see if post is returned
        if (!model) return res.status(404).send("Not Found");

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        res.render("models/show", {
            title: "Model",
            models: model
        });
    });
}

function newModel(req, res) {
    // Create an empty Model
    var newModel = {
        id: "",
        title: "",
        body: ""
    };

    res.render("models/new", {
        title: "New Model",
        models: newModel
    });
}

function editModel(req, res) {
    Model.findById(req.params.id, function(err, model) {

        // Check to see if post is returned
        if (!model) return res.status(404).send("Not Found");

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        res.render("models/edit", {
            title: "Edit Model",
            models: model
        });
    });
}

function createModel(req, res) {
    Model.create(req.body, function(err, model) {
        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect("/");
    });
}

function updateModel(req, res) {
    Model.findByIdAndUpdate(req.params.id, req.body, function(err, model) {

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect("/");
    });
}

function deleteModel(req, res) {
    Model.findByIdAndRemove(req.params.id, function(err, model) {

        // Check for errors and return 500 if there is a problem
        if (err) return res.status(500).send(err.message);

        // Redirect to a GET request
        res.redirect("/");
    });
}

module.exports = {
    index: indexModels,
    show: showModel,
    new: newModel,
    edit: editModel,
    create: createModel,
    update: updateModel,
    delete: deleteModel
};
