'use strict';

var express = require('express');
var controller = require('./form.controller');

var router = express.Router();


router.get('/:name', controller.index);
router.get('/:name/:version', controller.index);

module.exports = router;
