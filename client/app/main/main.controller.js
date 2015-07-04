'use strict';

angular.module('openanswersApp')
  .controller('MainCtrl', function ($scope, $http, socket) {


    var url = '/api/forms/testForm?callback=moooo';

    window.moooo = function(formDefinition, formlyTypes){
      console.log('formDefinition', formDefinition);
      console.log('formlyTypes', formlyTypes);
    };

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




  });
