angular
    .module('app.addBook', [])
    .component('addBook', {
        templateUrl: 'app/views/book/addBook.html',
        controller: 'addBookCtrl'
    })
    .controller('addBookCtrl', function ($scope, $http) {
        $scope.add = function () {
            $http({
                method: 'POST',
                url: '/books/add',
                data: {
                    'title': $scope.title,
                    'author': $scope.author,
                    'press': $scope.press,
                    'stock': $scope.stock
                }
            }).then((response) => {
                let res = response.data;
                if (res.status == 'err') {
                    alert(res.result.errmsg);
                } else {
                    alert('添加成功');
                    $scope.title = '';
                    $scope.author = '';
                    $scope.press = '';
                    $scope.stock = '';
                }       
            }, (error) => {
                alert('添加失败');
            });
        };
    });