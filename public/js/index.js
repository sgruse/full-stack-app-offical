'use strict';
// require (__dirname + './app/module.js');
require(__dirname + '/../css/style.css');

const angular = require('angular');

const app = angular.module('PeopleApp', [])
  .controller('PeopleController', ['$http', function($http) {
    const mainRoute = 'http://localhost:3000/api/people';
    this.smokeTest = 'Smoke Test';
    this.people = ['person'];
    this.editing = false;
    this.showPeople = false;
    this.getPeople = function() {
      $http.get(mainRoute)
        .then((result) => {
          this.people = result.data;
        },
      function(error) {
        console.log('ERRROR');
      })
    }
    this.createPerson = function(newPerson) {
      $http.post(mainRoute, newPerson)
      .then((res) => {
        this.people.push(res.data);
        // this.person = {};
      })
    }
    this.createPerson.rendered = null;

    this.removePerson = function(person) {
      $http.delete(mainRoute + '/' + person)
      .then((res) => {
        this.people = this.people.filter((p) => {
          return p._id != person
        })
      })
    }
    this.updatePerson = function(person) {
      this.updatePerson.rendered = null;
      $http.put(mainRoute + '/' + person._id, person)
      .then((res) => {
        this.editing = false;
        this.people = this.people.filter((p) => {
          return p._id == person._id
        })
      })
    }
  }]);
