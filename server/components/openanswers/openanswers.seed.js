
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
    },
    {
      name: 'view-form-button',
      dateCreated: new Date(),
      version: '1.0.0',

      templateTransformationScript: 'function transformation(template){ template.link = function (scope) { scope.viewForm = function (name) { console.log("viewing form", name); scope.$emit("go", "main", { currentForm: name, currentId: "" })};  } }',
      templateStlyeCSS: '',
      formlyType: {
        name: 'view-form-button',
        template: '<button type="button" ng-click="viewForm(model.name)" >View form</button>',
        defaultOptions: {
          templateOptions: {

          }
        }
      }
    },
    {
      name: 'save-form-button',
      dateCreated: new Date(),
      version: '1.0.0',





      templateTransformationScript: 'function transformation(template){  template.link = function (scope) { var $injector = angular.injector(["ng"]); var $http = $injector.get("$http"); scope.saveForm = function (model) { console.log("saving form", model); $http.put("/api/forms", model);    };  } }',
      templateStlyeCSS: '',
      formlyType: {
        name: 'save-form-button',
        template: '<button type="button" ng-click="saveForm(model)" >Save form</button>',
        defaultOptions: {
          templateOptions: {

          }
        }
      }
    },
    {
      name: 'bootstrap-repeating-section',
      dateCreated: new Date(),
      version: '1.0.0',

      templateTransformationScript: 'function transformation(template){ template.controller = function($scope) { $scope.formOptions = {formState: $scope.formState}; $scope.addNew = addNew; $scope.copyFields = copyFields; function copyFields(fields) { return angular.copy(fields); } function addNew() { $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || []; var repeatsection = $scope.model[$scope.options.key]; var lastSection = repeatsection[repeatsection.length - 1]; var newsection = {}; if (lastSection) { newsection = angular.copy(lastSection); } repeatsection.push(newsection); } } }',
      templateStlyeCSS: '',

      formlyType: {
        name: 'bootstrap-repeating-section',
        template: '<div>' +
    '<div class="{{hideRepeat}}">' +
        '<div class="repeatsection" ng-repeat="element in model[options.key]" ng-init="fields = copyFields(to.fields)">' +
        '<formly-form fields="fields"' +
        ' model="element"' +
    ' bind-name="\'formly_ng_repeat\' + index + $parent.$index">' +
        '</formly-form>' +
    '<div style="margin-bottom:20px;">' +
    '<button type="button" class="btn btn-sm btn-danger" ng-click="model[options.key].splice($index, 1)">' +
    'Remove' +
        '</button>' +
    '</div>' +
        '<hr>' +
    '</div>' +
        '<p class="AddNewButton">' +
        '<button type="button" class="btn btn-primary" ng-click="addNew()" >{{to.btnText}}</button>' +
        '</p>' +
        '</div>'

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

    },
    {
      name: 'formDefinitionForm',
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
                heading: 'Form Definition Form'
              }
            },
            {
              type: 'view-form-button',
              templateOptions: {

              },
              expressionProperties: {
                hide: 'model.name === "formDefinitionForm"'
              },
              hideExpression: 'model.name === "formDefinitionForm"'
            },
            {
              type: 'save-form-button',
              templateOptions: {}
            },
            {
              key: 'name',
              type: 'input',
              defaultValue: '',
              templateOptions: {
                placeholder: '',
                label: 'Form Name',
                required: true
              }
            },
            {
              key: 'defaultStep',
              type: 'input',
              defaultValue: '',
              templateOptions: {
                placeholder: '',
                label: 'Default step',
                required: true
              }
            },
            {
              key: 'steps',
              type: 'bootstrap-repeating-section',
              className: 'col-sm-10 col-sm-offset-2',
              templateOptions: {
                btnText: 'Add another step',
                fields: [
                  {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                      label: 'Step name'
                    }
                  },
                  {
                    key: 'formlyElements',
                    type: 'bootstrap-repeating-section',
                    className: 'col-sm-8 col-sm-offset-4',
                    templateOptions: {
                      btnText: 'Add another element',
                      fields: [
                        {
                          key: 'key',
                          type: 'input',
                          templateOptions: {
                            label: 'Element key'
                          }
                        },
                        {
                          key: 'type',
                          type: 'input',
                          templateOptions: {
                            label: 'Element type'
                          }
                        },
                        {
                          key: 'className',
                          type: 'input',
                          templateOptions: {
                            label: 'Element className'
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      ]

    }
  ];
}












