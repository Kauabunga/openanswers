
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
  getFormDefinition: getFormDefinition,
  getWrapper: undefined,

  getTemplates: undefined,
  getTemplateSets: undefined,
  getWrappers: undefined,
  getFormDefinitions: undefined,

  createTemplate: undefined,
  createTemplateSet: undefined,
  createWrapper: undefined,
  createFormDefinition: undefined,

  deleteTemplate: undefined,
  deleteTemplateSet: undefined,
  deleteWrapper: undefined,
  deleteFormDefinition: undefined
};





/**
 *
 */
function getCompleteFormDefinition(name, version){
  return new Promise(function(success, failure){


    getFormDefinition(name, version)
      .then(function(formDefinition){

        getTemplateSet(formDefinition.templateSetId)
          .then(function(templateSet){

            formDefinition.templateSet = templateSet;
            TemplateModel.findAsync({
                '_id': {
                  $in: templateSet.templateIds
                }
              })
              .then(function(templates){
                templateSet.templates = templates;
                success(formDefinition);
              })
              .catch(function(err){
                console.log('Error getting templates', err);
                return failure(err);
              });

          })
          .catch(function(err){
            console.log('Error getting template set', err);
            return failure(err);
          });

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


    if ( version ) {
      formDefinitionPromise = FormDefinitionModel.findOneAsync({
        name: name,
        version: version
      });
    }
    else {
      formDefinitionPromise = new Promise(function(success, failure){
        FormDefinitionModel.find({ name: name }).sort({dateCreated: -1}).limit(1)
          .exec(function(err, formDefinition){
            if(err){
              console.log('Could not find form definition', err);
              return failure(err);
            }
            else if(formDefinition && formDefinition[0]){
              console.log('found form definition');
              return success(formDefinition[0]);
            }
            else {
              console.log('Couldnt find form definition with formname', name);
              return failure(404);
            }
          });
      });
    }

    return formDefinitionPromise
      .then(function(formDefinition){
        if (formDefinition) {
          console.log('getFormDefinition() Found form deifinition', formDefinition.name);
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
function getTemplateSet(templateSetId){
  return TemplateSetModel.findByIdAsync(templateSetId);
}

/**
 *
 */
function getTemplate(templateIds){
  return new Promise(function(success, failure){



  });
}



