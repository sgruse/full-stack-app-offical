'use strict';

var People = require(__dirname + '/../models/person-model');

module.exports = (apiRouter) => {
apiRouter.route('/people')
  .get((req, res) => {
    People.find({}, (err, people) => {
      if (err) throw err;
      res.json({people});
      res.end();
    });
  })
  .post((req, res) => {
      var newPerson = new People(req.body);
      newPerson.save((err, person) => {
      console.log('NEWLY SAVED PERSON : ' + person);
      res.json(person._id);
      res.end();
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
    req.on('data', (data) => {
    req.body = JSON.parse(data);
    console.log('DATA COMING FROM ANGULAR PUT ROUTEA' + req.body);
    People.findByIdAndUpdate({_id: req.params.id}, req.body, (err, person) => {
      if (err) throw err;
      res.json(req.body);
    })
  })
})
  .delete((req, res) => {
    console.log('DELETE ROUTE HAS BEEN HIT WITH : ' + req.params.id);
    People.findById(req.params.id, (err, person) => {
      if (err) throw err;
      person.remove((err, person) => {
        res.send(person + ' has been deleted');
      })
    })
  })
}
