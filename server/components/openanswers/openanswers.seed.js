
/* global -Promise */
var Promise = require('bluebird');
var _ = require('lodash');

var TemplateModel = require('./models.mongoose/template.model');
var TemplateSetModel = require('./models.mongoose/templateSet.model');
var FormDefinitionModel = require('./models.mongoose/formDefinition.model');





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
              console.log('templates set seed', templateSet);

              FormDefinitionModel.createAsync(getFormDefinition(templateSet._id))
                .then(function(formDefinition){
                  console.log('created form definition', formDefinition);
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

      templateTransformationScript: '',
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
    templates: templateIds
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












