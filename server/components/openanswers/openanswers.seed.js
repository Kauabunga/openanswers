
/* global -Promise */
var Promise = require('bluebird');
var _ = require('lodash');

var TemplateModel = require('./models.mongoose/template.model');
var TemplateSetModel = require('./models.mongoose/templateSet.model');
var FormDefinitionModel = require('./models.mongoose/formDefinition.model');


//TODO this takes longer to seed that instantiating the tests

/**
 *
 */
TemplateModel.find({}).remove(function(){
  TemplateSetModel.find({name: getTemplateSet().name}).remove(function(){
    FormDefinitionModel.find({name: getFormDefinition().name }).remove(function(){

      TemplateModel.createAsync(getTemplates())
        .then(function(templates){

          var templateIds = _.map(templates, function(template){
            return template._id;
          });

          TemplateSetModel.createAsync(getTemplateSet(templateIds))
            .then(function(templateSet){

              FormDefinitionModel.createAsync(getFormDefinition(templateSet._id))
                .then(function(formDefinition){
                  console.log('created form definition', formDefinition);
                  console.log('created formDefinition.steps[0].formlyElements ', formDefinition.steps[0].formlyElements);
                });
            });

        });

    });
  });
});


/**
 *
 */
function getTemplates(){

  return [
    {
      name: 'basic-h1',
      dateCreated: new Date(),
      version: '1.0.0',

      templateTransformationScript: '',
      templateStlyeCSS: '',
      formlyType: {
        name: 'h1',
        template: '<h1>{{::to.heading}}</h1>',
        defaultOptions: {
          templateOptions:{
            heading: 'Default heading content'
          }
        }
      }
    },
    {
      name: 'basic-label',
      dateCreated: new Date(),
      version: '1.0.0',

      templateTransformationScript: '',
      templateStlyeCSS: '',
      formlyType: {
        name: 'label',
        template: '<label>{{::to.label}}</label>',
        defaultOptions: {
          templateOptions:{
            heading: 'Default label content'
          }
        }
      }
    },
    {
      name: 'basic-input',
      dateCreated: new Date(),
      version: '1.0.0',

      templateTransformationScript: 'function transformation(template){template.link = function(scope){console.log("link function from transformation script")};}',
      templateStlyeCSS: '',
      formlyType: {
        name: 'basic-input',
        template: '<input ng-model="model[options.key]" />',
        defaultOptions: {
          templateOptions: {
            required: false
          }
        }
      }
    }
  ];
}

/**
 *
 */
function getTemplateSet(templateIds){
  return {
    name: 'testTemplateSet',
    dateCreated: new Date(),
    version: '1.0.0',

    templateSetTransformationScript: '',
    templateSetStyleCSS: '',
    templateIds: templateIds
  }
}

/**
 *
 */
function getFormDefinition(templateSetId){
  return {
    name: 'testForm',
    dateCreated: new Date(),
    version: '1.0.0',

    templateSetId: templateSetId,

    defaultStep: 'main',
    steps: [
      {
        name: 'main',
        formlyElements: [
          {
            key: 'firstName',
            type: 'input',
            defaultValue: 'Muppet',
            templateOptions: {
              label: '',
              placeholder: '',
              required: true
            }
          }
        ]
      }
    ]

  };
}












