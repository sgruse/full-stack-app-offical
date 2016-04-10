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
          console.log('RESULT FROM GET CONTROLLER :' + result);
          $scope.people = result.data.people;
        },
      function(error) {
        console.log('ERRROR');
      })
    }
    $scope.createPerson = function(newPerson) {
      console.log('CREATE PERSON BUTTON CLICKED');
      console.log('PERSON FROM INPUT FIELD : ' + newPerson);
      $http.post(mainRoute, newPerson, {})
      .then( function(res){
        $scope.people.push(newPerson);
        res.send(newPerson)
        res.end();
      })
    }
  }]);
