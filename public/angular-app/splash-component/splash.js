(function() {
  'use strict';
  angular.module('app')
    .component('splash', {
      controller: Controller,
      templateUrl:'./angular-app/splash-component/splash.template.html'
    });

    Controller.$inject = ['$http', '$stateParams'];

    function Controller($http, $stateParams) {
      const vm = this;

      vm.$onInit = function () {

      };

    }

}());
