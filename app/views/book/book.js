angular
    .module('app.book', [])
    .component('book', {
        templateUrl: 'app/views/book/book.html',
        controller: 'bookCtrl'
    })
    .controller('bookCtrl', function($scope, $state, $location) { //$state可以删除
        var localtion = $location.path().split("/")[2];
        $scope.sidenavList = [
            {
                name: '所有图书',
                href: 'book.allBook'
            },
            {
                name: '增加图书',
                href: 'book.addBook'
            }
        ];
        //修复刷新后对于链接样式问题
        switch (localtion) {
            case "":
                $scope.selectedIndex = 0;
                break;

            case "allBook": 
                $scope.selectedIndex = 0;
                break;
            
            case "addBook":
                $scope.selectedIndex = 1;
                break;
        }

        $scope.changeIndex = function(index) {
            $scope.selectedIndex = index;
        };
    });