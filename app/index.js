'use strict';

const angular = require('angular');

const app = angular.module('PeopleApp', [])
  .controller('PeopleController', ['$http', function($http) {
    const mainRoute = 'http://localhost:3000/api/people';
    this.smokeTest = 'Smoke Test';
    this.people = [];
    this.editing = false;
    this.showPeople = false;
    this.getPeople = function() {
    console.log('GET PEOPLE HIT');
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
      .then(function(res){
        this.people.push(newPerson);
        // this.newPerson = {};
      })
    }
    this.createPerson.rendered = null;

    this.removePerson = function(person) {
      $http.delete(mainRoute + '/' + person._id)
      .then((res) => {
        this.people = this.people.filter((p) => {
          p._id != person._id
          this.getPeople();
        })
      })
    }
    this.updatePerson = function(person) {
      console.log('UPDATE PERSON HAS BEEN HIT!!!');
      this.updateCustomer.rendered = null;
      $http.put(mainRoute + '/' + person._id)
      .then((res) => {
        this.editing = false;
        this.people = this.people.filter((p) => {
          p._id = person._id
        })
      })
    }
  }]);
