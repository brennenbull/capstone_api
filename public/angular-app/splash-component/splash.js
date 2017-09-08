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
        vm.customTag = ""
        vm.catList=[];
        $http({
          method: 'GET',
          url: 'https://mighty-taiga-78748.herokuapp.com/splash/1'
        }).then(function(res){
          vm.name = res.data.firstname;
          let hostArr = [];
          let notesArr = [];
          for(let keys in res.data.hostsNotes){
            notesArr.push({name:keys, notes:res.data.hostsNotes[keys]})
            hostArr.push({host:keys});
          }
          let obj = {};
          for(let i = 0; i < notesArr.length; i++){
            let note = notesArr[i].notes
            for(let j = 0; j < note.length; j++){
              if(obj[note[j].category] === undefined){
                obj[note[j].category] = 1;
              }
            }
          }
          for(let cat in obj){
            vm.catList.push({cat});
          }
          vm.notes = notesArr;
          vm.hostList = hostArr;
        })
      };

      vm.showEdit = function(obj){
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
          url: `https://mighty-taiga-78748.herokuapp.com/splash/note/${note['notes_id']}`,
          data: dataObj
        }).then(()=>{
          note.show = false;
        })
      }

      vm.deleteNote = function(note){
        $http({
          method: 'DELETE',
          url: `https://mighty-taiga-78748.herokuapp.com/splash/note/${note['notes_id']}`
        }).then(()=>{
          $http({
            method: 'GET',
            url: '/splash/1'
          }).then(function(res){
            let hostArr = [];
            let notesArr = [];
            for(let keys in res.data.hostsNotes){
              notesArr.push({name:keys, notes:res.data.hostsNotes[keys]})
              hostArr.push({host:keys});
            }
            vm.notes = notesArr;
            vm.hostList = hostArr;
          })
        })
      }

      vm.addClass = function(hostEle, hostlist){
        hostlist.forEach((ele)=>{
          if(ele.host == hostEle.host){
            ele.selected = true;
          }else{
            ele.selected = false;
          }
        })
      }

      vm.addCatClass = function(hostEle, hostlist){
        hostlist.forEach((ele)=>{
          if(ele.cat == hostEle.cat){
            ele.selected = true;
          }else{
            ele.selected = false;
          }
        })
      }

      vm.removeClass = function(list){
        list.forEach((ele)=>{
          ele.selected = false;
        })
      }


    }
}());
