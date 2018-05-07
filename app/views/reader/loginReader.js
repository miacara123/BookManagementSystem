angular
    .module('app.loginReader', [])
    .component('loginReader', {
        templateUrl: 'app/views/reader/loginReader.html',
        controller: 'loginReaderCtrl'
    })
    .controller('loginReaderCtrl', function($scope, $http){
        console.log(11);
    });