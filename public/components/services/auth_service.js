module.exports = function(app) {
  app.factory('AuthService', ['$http', '$window', function($http, $window) {
    var token;
    var url = 'http://localhost:3000';
    var auth = {
      createUser(user, cb) {
        cb || function() {};
        $http.post(url + '/signup')
          .then((res) => {
            token = $window.loacalStorage.token = res.data.token;
            cb(null, res)
          }, (err) => {
            cb(err)
          })
      },
      getToken() {
        return token || $window.localStorage.token;
      },
    signOut(cb) {
      // cb = cb || function() {}
      token = null;
      $window.localStorage.token = null;
      cb && cb();
    },
    signIn(user, cb) {
      cb = cb || function() {};
      $http.get(url + '/signin', {
        headers: {
          authorization: 'Basic ' + btoa(user.email + ':' + user.password)
        }
      }).then((res) => {
        token = $window.localStorage.token = res.data.token;
        cb(null, res);
      }, (err) => {
        cb(err);
      })
    }
  }
    return auth;
  }])
}
