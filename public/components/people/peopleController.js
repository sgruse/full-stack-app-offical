'use strict';

const angular = require('angular');

// require('angular-route');

// require (__dirname + './app/module.js');
const app = angular.module('PeopleApp', [])

require(__dirname + '/../../css/style.css');
require('./peopleService')(app)

require(__dirname + '/../services/auth_service')(app);
require('./error_service')(app);

  app.controller('PeopleController', ['$http', 'PeopleService', 'ErrorService', 'AuthService',
  function($http, PeopleService, ErrorService, AuthService) {

    const vm = this;
    const peopleResource = PeopleService('people');

    vm.error = ErrorService();

    vm.smokeTest = 'Smoke Test';
    vm.people = ['person'];
    vm.editing = false;
    vm.showPeople = false;

    vm.getPeople = function() {
      peopleResource.getAll()
        .then((result) => {
          vm.people = result.data;
        },
      function(error) {
        console.log('ERRROR');
      })
    }
    vm.createPerson = function(person) {
      peopleResource.create(person)
      .then((res) => {
        vm.people.push(res.data);
        // vm.person = {};
      })
    }
    vm.createPerson.rendered = null;

    vm.removePerson = function(person) {
      peopleResource.delete(person)
      .then((res) => {
        vm.people = vm.people.filter((p) => {
          return p._id != person
        })
      })
    }
    vm.updatePerson = function(person) {
      vm.updatePerson.rendered = null;
      peopleResource.update(person)
      .then((res) => {
        vm.editing = false;
        vm.people = vm.people.filter((p) => {
          return p._id == person._id
        })
      })
    }

    vm.signUp = function(user) {
      AuthService.createUser(user, function(err, res) {
        if (err) return ErrorService('Problem Creating User');
        $location.path('/home');
      })
    }

  }])

  .directive('peopleDirective', function() {
    return {
      restrict: 'E',
      templateUrl: './peopleView.html'
    }
  })

  app.config(['$routeProvider', function(router) {
    router
      .when('signUp', {
        controller: 'PeopleController as peoplectrl',
        controllerAs: 'peoplectrl',
        templateUrl: './signUp.html'
      })
      .when('/home', {
        controller: 'PeopleController',
        controllerAs: 'peoplectrl',
        templateUrl: './home.html'
      })
  }])
