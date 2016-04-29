'use strict';

require(__dirname + '/../services/auth_service');

module.exports = function(app) {
  app.factory('PeopleService', ['$http', 'AuthService',
  function($http, AuthService) {
    const mainRoute = 'http://localhost:3000/api/';

    function Resource(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.getAll = function() {
      console.log('People Service Get has been hit!!!!!!!!!');
      return $http.get(mainRoute + this.resourceName, {
        headers: {
          token: AuthService.getToken()
        }
      })
    }

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data, {
        headers: {
          token: AuthService.getToken()
        }
      })
    }

    Resource.prototype.delete = function(data) {
      return $http.delete(mainRoute + this.resourceName + '/' + data, {
        headers: {
          token: AuthService.getToken()
        }
      })
    }

    Resource.prototype.update = function(data) {
      return $http.put(mainRoute + this.resourceName + '/' + data._id, data, {
        headers: {
          token: AuthService.getToken()
        }
      })
    }

    return function(resourceName) {
      return new Resource(resourceName);
    }
  }])
}
