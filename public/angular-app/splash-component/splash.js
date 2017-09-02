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
        vm.hostList=[];
        vm.name="";
        vm.customFilter= "";
        $http({
          method: 'GET',
          url: '/splash/1'
        }).then(function(res){
          vm.name = res.data.firstname;
          let hostArr = [];
          let notesArr = [];
          for(let keys in res.data.hostsNotes){
            notesArr.push({name:keys, notes:res.data.hostsNotes[keys]})
            hostArr.push(keys);
          }
          console.log(notesArr);
          vm.notes = notesArr;
          vm.hostList = hostArr;
        })
      };

      vm.showEdit = function(obj){
        console.log(obj);
        if(obj.show === false || obj.show === undefined){
          obj.show = true;
        }else{
          obj.show = false;
        }
      };

      vm.editNote = function(note){
        let dataObj = {
          users_id: 1,
          title: note['title'],
          content: note['content']
        }
        $http({
          method: 'PATCH',
          url: `/splash/note/${note['notes_id']}`,
          data: dataObj
        }).then(()=>{
          note.show = false;
        })
      }

      vm.deleteNote = function(note){
        $http({
          method: 'DELETE',
          url: `/splash/note/${note['notes_id']}`
        }).then(()=>{
          $http({
            method: 'GET',
            url: '/splash/1'
          }).then(function(res){
            let hostArr = [];
            let notesArr = [];
            for(let keys in res.data.hostsNotes){
              notesArr.push({name:keys, notes:res.data.hostsNotes[keys]})
              hostArr.push(keys);
            }
            console.log(notesArr);
            vm.notes = notesArr;
            vm.hostList = hostArr;
          })
        })
      }
    }



}());
