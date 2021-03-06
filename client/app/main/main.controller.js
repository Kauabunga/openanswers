'use strict';

angular.module('openanswersApp')
  .controller('MainCtrl', function ($scope, $log, $stateParams, $openanswers) {



    var url = '/api/forms/' + $stateParams.currentForm + '?callback=formCallback';

    window.formCallback = formCallback;

    $('body').append( getTransformationScriptElement() );

    /**
     *
     * @param form
     * @param module
     */
    function getTransformationScriptElement(){
      var transformationScript = document.createElement( 'script' );
      transformationScript.type = 'text/javascript';
      transformationScript.src = url;
      return transformationScript;
    }


    /**
     *
     * @param formDefinition
     * @param formlyTypes
     */
    function formCallback(formDefinition, formlyTypes){
      console.log('formDefinition', formDefinition);
      console.log('formlyTypes', formlyTypes);


      $openanswers.loadTemplates(formlyTypes)
        .then(function(){
          $scope.formDefinition = formDefinition;
        });

    }




  });
