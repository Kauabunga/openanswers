
/* global -Promise */
var Promise = require('bluebird');


var TemplateModel = require('./models.mongoose/template.model');
var TemplateSetModel = require('./models.mongoose/templateSet.model');
var FormDefinitionModel = require('./models.mongoose/formDefinition.model');


/**
 *
 */
return module.exports = {
  getCompleteFormDefinition: getCompleteFormDefinition,

  getTemplate: getTemplate,
  getTemplateSet: getTemplateSet,
  getFormDefinition: getFormDefinition
};





/**
 *
 */
function getCompleteFormDefinition(name, version){
  return new Promise(function(success, failure){


    getFormDefinition(name, version)
      .then(function(formDefinition){



      })
      .catch(function(err){
        console.log('Error getting form definition', err);
        return failure(err);
      });

  });
}

/**
 *
 */
function getFormDefinition(name, version){
  return new Promise(function(success, failure){

    console.log('openAnswersDaoMongoose.getFormDefinition', name, version);

    if( ! name ){
      return failure(400);
    }

    var formDefinitionPromise;


    if (version) {
      formDefinitionPromise = FormDefinitionModel.findOneAsync({
        name: name,
        version: version
      });
    }
    else {
      formDefinitionPromise = new Promise(function(success, failure){
        FormDefinitionModel.find({name: name}).sort({dateCreated: -1}).limit(1)
          .exec(function(err, formDefinition){
            if(err){
              return failure(err);
            }
            else if(formDefinition && formDefinition[0]){
              return success(formDefinition[0]);
            }
            else {
              console.log('Couldnt find form definition with formname and version');
              return failure(404);
            }
          });
      });
    }

    return formDefinitionPromise
      .then(function(formDefinition){

        if (formDefinition) {
          // TODO ensure that at most a single form is returned
          return success(formDefinition);
        }
        else {
          console.log('Could not find a form definition', name, version);
          return failure(404);
        }
      })
      .catch(function(err){
        console.log('Error finding form definition');
        return failure(500);
      });

  });
}

/**
 *
 */
function getTemplateSet(){
  return new Promise(function(success, failure){



  });
}

/**
 *
 */
function getTemplate(){
  return new Promise(function(success, failure){



  });
}



