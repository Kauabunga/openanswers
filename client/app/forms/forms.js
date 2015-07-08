'use strict';

angular.module('openanswersApp')
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/forms');


    $stateProvider
      .state('forms', {
        url: '/forms',
        templateUrl: 'app/forms/forms.html',
        controller: 'FormsCtrl'
      });


  });
