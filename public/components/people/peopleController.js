'use strict';

const angular = require('angular');

require('angular-route');

// require (__dirname + './app/module.js');
const app = angular.module('PeopleApp', ['ngRoute'])

require(__dirname + '/../../css/style.css');
require('./peopleService')(app)

require(__dirname + '/../services/auth_service')(app);
require('./error_service')(app);

  app.controller('PeopleController', ['$http', '$location', 'PeopleService', 'ErrorService', 'AuthService',
  function($http, $location, PeopleService, ErrorService, AuthService) {

    const vm = this;
    const peopleResource = PeopleService('people');
    vm.showList = false;

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
        ErrorService('Please sign in')
        $location.path('/signUp');
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

    vm.signIn = function(user) {
      AuthService.signIn(user, (err, res) => {
        if (err) return ErrorService('Problem signing in')
        $location.path('/home');
      })
    }

    vm.signUp = function(user) {
      AuthService.createUser(user, function(err, res) {
        if (err) return ErrorService('Problem Creating User');
        $location.path('/home');
      })
    }

    vm.signOut = function() {
      AuthService.signOut(() => {
        $location.path('/signUp');
      })
    }

  }])

  .directive('peopleDirective', function() {
    return {
      restrict: 'E',
      templateUrl: './peopleView.html'
    }
  })

  app.config(['$routeProvider', '$locationProvider', function(router, $locationProvider) {
    router
      .when('/signUp', {
        controller: 'PeopleController',
        controllerAs: 'peoplectrl',
        // templateUrl: './signUp.html'
        templateUrl: './signUp.html'

      })
      .when('/', {
        controller: 'PeopleController',
        controllerAs: 'peoplectrl',
        // templateUrl: './signUp.html'
        templateUrl: './signUp.html'

      })
      .when('/home', {
        controller: 'PeopleController',
        controllerAs: 'peoplectrl',
        templateUrl: './peopleView.html'
      })
      // $locationProvider.html5Mode({
      //   enabled: true,
      //   requireBase: false
      // });
  }])
