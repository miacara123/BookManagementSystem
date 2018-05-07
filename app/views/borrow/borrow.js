angular
    .module('app.borrow', [])
    .component('borrow', {
        templateUrl: 'app/views/borrow/borrow.html',
        controller: 'borrowCtrl'
    })
    .controller('borrowCtrl', function($scope, $state, $location) {
        var localtion = $location.path().split("/")[2];
        $scope.sidenavList = [
            {
                name: '借书',
                href: 'borrow.borrowBook'
            },
            {
                name: '还书',
                href: 'borrow.returnBook'
            }
        ];
        //修复刷新后对于链接样式问
        switch (localtion) {
            case "":
                $scope.selectedIndex = 0;
                break;

            case "borrowBook": 
                $scope.selectedIndex = 0;
                break;
            
            case "returnBook":
                $scope.selectedIndex = 1;
                break;
        }

        $scope.changeIndex = function(index) {
            $scope.selectedIndex = index;
        };
    });