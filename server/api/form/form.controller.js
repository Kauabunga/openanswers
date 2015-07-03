'use strict';

var _ = require('lodash');

var openAnswersService = require('../../components/openanswers/openanswers.service');
var openAnswersDao =     require('../../components/openanswers/openanswers.dao.mongoose');


/**
 * The current form based upon the provided params
 *
 * @param req
 * @param res
 */
exports.index = function(req, res) {

  console.log('form.controller.index()');

  var name = req.params.name;
  var version = req.params.version;

  return openAnswersDao.getFormDefinition(name, version)
    .then(function(formDefinition){
      console.log('getFormDefinition Success', formDefinition);
      return res.status(200).json(formDefinition);
    })
    .catch(function(err){
      console.log('error getting form definition', err);
      return res.status(500).send();
    });

};
