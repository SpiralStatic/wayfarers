var express = require('express');
var router = express.Router();
var locationsController = require('../controllers/locations');
var usersController = require('../controllers/users');
var sessionsController = require('../controllers/sessions');

router.route('/sessions')
    .delete(sessionsController.delete)
    .post(sessionsController.create);

router.route('/sessions/new')
    .get(sessionsController.new);

router.route('/users')
    .get(usersController.index)
    .post(usersController.create);

router.route('/users/new')
    .get(usersController.new);

router.route('/users/:id')
    .put(usersController.update);

router.route('/users/:id/edit')
    .get(usersController.edit);

router.route('/')
    .get(locationsController.index)
    .post(locationsController.create);

router.route('/new')
    .get(locationsController.new);

router.route('/:id')
    .get(locationsController.show)
    .put(locationsController.update)
    .delete(locationsController.delete);

router.route('/:id/edit')
    .get(locationsController.edit);

module.exports = router;
