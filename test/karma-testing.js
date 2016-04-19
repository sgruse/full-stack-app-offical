require(__dirname + '/../public/js/index.js');
const angular = require('angular');
require('angular-mocks');

describe('It should test soething', () => {
  var peopleController;
  it('Should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('PeopleApp'))
  beforeEach(angular.mock.inject(function($controller) {
    peopleController = $controller('PeopleController');
  }))
  it('Should construct and controller', () => {
    expect(typeof peopleController).toBe('object');
    expect(peopleController.people[0]).toBe('person');
    expect(typeof peopleController.getPeople).toBe('function');
  });
  describe('REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should get all people', () => {
      $httpBackend.expectGET('http://localhost:3000/api/people')
      .respond(200, {data: [{name: 'Johnsoville'}]});
      peopleController.getPeople();
      $httpBackend.flush();
      // console.log('get route testing', peopleController.people.data);
      expect(peopleController.people.data.length).toBeGreaterThan(0);
      expect(peopleController.people.data[0].name).toBe('Johnsoville');

      // WHY DID I HAVE TO JIG THIS TOGETHER WITH DATA ?
    });

    it('Should create a new person', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/people', {name: 'post person'})

      // SHOULDN"T THIS BE AN OBJECT WITH THE BELOW DATA
      // WHATS THE LINK BETWEEN THE NAME SENT ABOVE AND THE NAME IN THE OBJECT BELOW

      .respond(200, {name: 'post person', age: 27, _id:'uniqueid'});
      peopleController.createPerson({name: 'post person'})
      $httpBackend.flush()
      expect(peopleController.people.length).toBe(2);
      expect(peopleController.people[1].name).toBe('post person')

      // WHY DOES HE HAVE NEW PERSON SET TO AN EMPTY OBJECT IN HIS APP.JS
    });

    it('Should delete a person', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/people/19')
      .respond(200, 'deleted');
      peopleController.people.push({name: 'sam', _id: 19});

      // IS THIS DATA ABOVE THE RESET DATA FOR THIS ROUTE ONLY? WONT ADD UP

      peopleController.removePerson(19);
      $httpBackend.flush();
      // console.log('DELETE ROUTE PEOPLE ARRAY', peopleController.people);
      expect(peopleController.people.length).toBe(0);
      expect(peopleController.people.every((p) => p._id != 19)).toBe(true);

      // WHY IS THIS WORKING WHEN THERE SHOULD STILL BE ONE IN HERE
    });

    it('Should update a person', () => {
      var updatePerson = {name: 'johnny wat', _id: 15};
      $httpBackend.expectPUT('http://localhost:3000/api/people/15')
      .respond(200, 'updated');
      peopleController.people.push(updatePerson);
      peopleController.updatePerson(updatePerson);
      $httpBackend.flush();
      expect(updatePerson.editing).toBe(false);
    });


  });
})
