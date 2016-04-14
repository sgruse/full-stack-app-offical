'use strict';

const app = require('express')();
  app.use(require('express').static(__dirname + '/public'))
  app.listen(8080, () => console.log('up on 8080'));
