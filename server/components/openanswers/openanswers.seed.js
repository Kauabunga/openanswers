
/* global -Promise */
var Promise = require('bluebird');
var _ = require('lodash');

var TemplateModel = require('./models.mongoose/template.model');
var TemplateSetModel = require('./models.mongoose/templateSet.model');
var FormDefinitionModel = require('./models.mongoose/formDefinition.model');


// TODO this takes longer to seed that instantiating the tests

// TODO copy in and namespace bootstrap- templates -> templateSet

/**
 *
 */
TemplateModel.find({}).remove(function(){
  TemplateSetModel.find({}).remove(function(){
    FormDefinitionModel.find({}).remove(function(){

      TemplateModel.createAsync(getTemplates())
        .then(function(templates){

          var templateIds = _.map(templates, function(template){
            return template._id;
          });

          TemplateSetModel.createAsync(getTemplateSet(templateIds))
            .then(function(templateSet){

              FormDefinitionModel.createAsync(getFormDefinition(templateSet._id))
                .then(function(formDefinition){
                  console.log('created form definition', formDefinition.name);
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
        name: 'basic-h1',
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
        name: 'basic-label',
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
    },
    {
      name: 'basic-textbox',
      dateCreated: new Date(),
      version: '1.0.0',

      templateTransformationScript: 'function transformation(template){template.link = function(scope){console.log("link function from transformation script")};}',
      templateStlyeCSS: '',
      formlyType: {
        name: 'basic-textbox',
        template: '<textarea ng-model="model[options.key]" />',
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
  return [
    {
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
              type: 'basic-h1',
              templateOptions: {
                heading: 'Test Form title'
              }
            },
            {
              key: 'firstName',
              type: 'basic-input',
              defaultValue: '',
              templateOptions: {
                label: '',
                placeholder: '',
                required: true
              }
            }
          ]
        }
      ]

    },
    {
      name: 'templateForm',
      dateCreated: new Date(),
      version: '1.0.0',

      templateSetId: templateSetId,

      defaultStep: 'edit',
      steps: [
        {
          name: 'edit',
          formlyElements: [

            {
              type: 'basic-h1',
              templateOptions: {
                heading: 'Template form'
              }
            },
            {
              key: 'name',
              type: 'input',
              defaultValue: '',
              templateOptions: {
                placeholder: '',
                label: 'Template Name',
                required: true
              }
            },
            {
              key: 'templateStlyeCSS',
              type: 'textarea',
              defaultValue: '/* Enter css styles below */',
              templateOptions: {
                label: 'Template Style CSS',
                placeholder: '',
                required: false
              }
            },
            {
              key: 'templateTransformationScript',
              type: 'textarea',
              defaultValue: 'function transform(template) {\n\n/* Enter transformation here */\n\n\n}',
              templateOptions: {
                placeholder: '',
                label: 'Template Transformation Script',
                required: false
              }
            }


          ]
        }
      ]


    //{
    //  name: 'basic-label',
    //  dateCreated: new Date(),
    //  version: '1.0.0',
    //
    //  templateTransformationScript: '',
    //  templateStlyeCSS: '',
    //  formlyType: {
    //    name: 'basic-label',
    //    template: '<label>{{::to.label}}</label>',
    //    defaultOptions: {
    //      templateOptions:{
    //        heading: 'Default label content'
    //      }
    //    }
    //  }
    //},

    }
  ];
}












