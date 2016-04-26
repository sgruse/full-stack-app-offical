'use strict';

const angular = require('angular');
// require (__dirname + './app/module.js');
const app = angular.module('PeopleApp', [])

require(__dirname + '/../../css/style.css');
require('./peopleService')(app)


  app.controller('PeopleController', ['$http', 'PeopleService', function($http, PeopleService) {
    // const mainRoute = 'http://localhost:3000/api/people';
    const vm = this;
    const peopleResource = PeopleService('people');

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
  }])

  .directive('peopleDirective', function() {
    return {
      restrict: 'E',
      templateUrl: './peopleView.html'
    }
  })
