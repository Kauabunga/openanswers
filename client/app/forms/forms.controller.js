'use strict';

angular.module('openanswersApp')
  .controller('FormsCtrl', function ($scope, $http, $log, $state, $openanswers) {


    $scope.openForm = openForm;


    return init();

    /**
     *
     */
    function init() {
      $http.get('/api/forms')
        .then(function (response) {
          $log.debug('/api/forms response', response.data);
          $scope.forms = response.data;
        })
        .catch(function (err) {
          $log.error('Error getting forms', err);
        });
    }

    /**
     *
     */
    function openForm(form){

      $log.debug('opening form', form);

      if(! form._formId){
        form._formId = $openanswers.getNewFormId();
      }

      $openanswers.addForm('formDefinitionForm', form);

      $state.go('main', {
        currentForm: 'formDefinitionForm',
        currentStep: '',
        currentId: form._formId
      });


    }

  });
