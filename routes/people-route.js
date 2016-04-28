'use strict';
const express = require('express');
const jsoneParser = require('body-parser').json();
var People = require(__dirname + '/../models/person-model');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const jwtAuth = require(__dirname + '/../lib/jwt_auth.js');

module.exports = (apiRouter) => {
apiRouter.route('/people')
  .get(jwtAuth, (req, res) => {
    People.find({}, (err, people) => {
      if (err) throw err;
      res.json(people);
    });
  })
  .post((req, res) => {
      var newPerson = new People(req.body);
      newPerson.save((err, person) => {
      res.json(person);
    });
})

apiRouter.route('/people/:id')
  .get((req, res) => {
    People.findById(req.params.id, (err, person) => {
      if (err) throw err;
      res.json(person)
    })
  })
  .put((req, res) => {
    People.findByIdAndUpdate({_id: req.params.id}, req.body, (err, person) => {
      if (err) throw err;
      res.json(req.body);
    })
})
  .delete(jwtAuth, (req, res) => {
    console.log('DELETE ROUTE HAS BEEN HIT WITH : ' + req.params.id);
    People.findById(req.params.id, (err, person) => {
      if (err) throw err;
      person.remove((err, person) => {
        res.send(person + ' has been deleted');
      })
    })
  })
}
