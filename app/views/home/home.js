angular
    .module('app.home', [])
    .component('home', {
        templateUrl: 'app/views/home/home.html',
        controller: 'homeCtrl'
    })
    .controller('homeCtrl', function($scope, $http) {
        $scope.getTopicList = function() {
            $http({
                method: 'GET',
                url: '/books/topicList'
            }).then((response) => {
                let res = response.data;
                $scope.topicList = res.result;
            }, (error) => {
                alert('获取图书列表失败');
            });
        };

        $scope.getOvertimeList = function() {
            $http({
                method: 'GET',
                url: '/books/overtimeList'
            }).then((response) => {
                let res = response.data;
                $scope.overtimeList = res.result;
            }, (error) => {
                alert('获取图书列表失败');
            });
        };

        $scope.getTopicList();
        $scope.getOvertimeList();
    });