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
exports.getForm = function(req, res) {

  console.log('form.controller.index()');

  var name = req.params.name;
  var version = req.params.version;

  var callback = getCallback(req);

  return openAnswersDao.getCompleteFormDefinition(name, version)
    .then(function(formDefinition){

      openAnswersService.compileForm(formDefinition, callback)
        .then(function(compiledFormJs){
          return res.status(200).type('application/javascript').send(compiledFormJs);
        })
        .catch(function(err){
          console.log('error compiling form definition', err);
          return res.status(500).send();
        });
    })
    .catch(function(err){
      console.log('error getting form definition', err);
      return res.status(500).send();
    });

};

/**
 *
 * @param req
 * @param res
 */
exports.index = function(req, res){
  return openAnswersDao.getFormDefinitions()
    .then(function(forms){
      res.status(200).json(forms);
    })
    .catch(function(err){
      console.log('Error getting form definitions', err);
      res.status(500).send();
    })
};


/**
 *
 * @param req
 * @param res
 */
exports.updateForm = function(req, res) {

  delete req.body.__v;

  openAnswersDao.updateFormDefinition(req.body)
    .then(function(updatedForm){
      res.status(200).json(updatedForm);
    })
    .catch(function(err){
      console.log('Error updating form', err);
      res.status(500).send();
    });
};

/**
 *
 * @param req
 */
function getCallback(req){
  return req.query && req.query.callback;
}
