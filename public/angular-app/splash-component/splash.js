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
        vm.notes=[];
        $http({
          method: 'GET',
          url: 'http://localhost:8380/splash/1'
        }).then(function(response){
          vm.notes = response.data;
        })
      };
    }

}());
