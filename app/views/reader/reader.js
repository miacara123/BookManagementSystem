angular
    .module('app.reader', [])
    .component('reader', {
        templateUrl: 'app/views/reader/reader.html',
        controller: 'readerCtrl'
    })
    .controller('readerCtrl', function($scope, $state, $location) {
        var localtion = $location.path().split("/")[2];
        $scope.sidenavList = [
            {
                name: '所有读者',
                href: 'reader.allReader'
            },
            {
                name: '读者登录',
                href: 'reader.loginReader'
            }
        ];
        //修复刷新后对于链接样式问
        switch (localtion) {
            case "":
                $scope.selectedIndex = 0;
                break;

            case "allReader": 
                $scope.selectedIndex = 0;
                break;
            
            case "loginReader":
                $scope.selectedIndex = 1;
                break;
        }
        $scope.changeIndex = function(index) {
            $scope.selectedIndex = index;
        };
    });