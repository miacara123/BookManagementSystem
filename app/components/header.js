angular
    .module('app.header', [])
    .component('myHeader', {
        templateUrl: 'app/components/header.html',
        controller: 'headerCtrl'
    })
    .controller('headerCtrl', function($scope, $location, $state) {
        // 刷新时修正 selectedIndex
        var path = $location.$$path.split('/')[1];
        switch(path) {
            case '':
                $scope.selectedIndex = 0;
                break;
            case 'book':
                $scope.selectedIndex = 1;
                break;
            case 'borrow':
                $scope.selectedIndex = 2;
                break;
            case 'reader':
                $scope.selectedIndex = 3;
                break;
        }
        // 这里的href指的是ui-router的state的name
        $scope.headerList = [{
                href: 'home',
                name: '首页'
            },
            {
                href: 'book',
                name: '图书管理'
            },
            {
                href: 'borrow',
                name: '借还管理'
            },
            {
                href: 'reader',
                name: '读者管理'
            }
        ];
        $scope.changeIndex = function(index) {
            $scope.selectedIndex = index;
        };
    });