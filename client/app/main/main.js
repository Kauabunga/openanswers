'use strict';

angular.module('openanswersApp')
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/', '/testForm//');

    $stateProvider
      .state('main', {
        url: '/:currentForm/:currentStep/:currentId',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
