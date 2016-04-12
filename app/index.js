'use strict';

const angular = require('angular');

const app = angular.module('PeopleApp', [])
  .controller('PeopleController', ['$http', '$scope', function($http, $scope) {
    const mainRoute = 'http://localhost:3000/api/people';
    $scope.smokeTest = 'Smoke Test';
    $scope.people = [];
    $scope.getPeople = function() {
      $http.get(mainRoute)
        .then((result) => {
          for(var i = 0; i < result.data.people.length; i++) {
            $scope.people[i] = result.data.people[i]
          }
        },
      function(error) {
        console.log('ERRROR');
      })
    }
    $scope.createPerson = function(newPerson) {
      $http.post(mainRoute, newPerson)
      .then( function(res){
        $scope.people.push(newPerson);
      })
    }
    $scope.removePerson = function(person) {
      $http.delete(mainRoute + '/' + person._id)
      .then((res) => {
        $scope.people = $scope.people.filter((p) => {
          p._id != person._id
          $scope.getPeople();
        })
      })
    }
    $scope.updatePerson = function(person) {
      console.log('UPDATE PERSON HAS BEEN HIT!!!');
      $http.put(mainRoute + '/' + person._id)
      .then((res) => {
        $scope.people = $scope.people.filter((p) => {
          p._id = person._id
        })
      })
    }
  }]);
