var express = require('express');
var router = express.Router();
var locationsController = require('../controllers/locations');

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
