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
      res.json(person);
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
    People.findByIdAndUpdate({_id: req.params.id}, req.body, (err, person) => {
      if (err) throw err;
      res.json(req.body);
    })
  })
})
  .delete((req, res) => {
    Person.findByIdAndRemove(req.params.id, (err, person) => {
      if (err) throw err;
      res.send(person + ' has been deleted');
    })
  })
}