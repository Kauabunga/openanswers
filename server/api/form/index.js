'use strict';

var express = require('express');
var controller = require('./form.controller');

var router = express.Router();


router.get('/', controller.index);

router.put('/', controller.updateForm);

router.get('/:name', controller.getForm);
router.get('/:name/:version', controller.getForm);




module.exports = router;
