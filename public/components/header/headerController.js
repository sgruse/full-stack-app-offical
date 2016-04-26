'use strict';

const angular = require('angular');

(function() {
  angular.module('HeadModule', [])

  .directive('headerDirective', function() {
    return {
      restrict: 'E',
      templateUrl: './headerView.html'
    }
  })
})();
