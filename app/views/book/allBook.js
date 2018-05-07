angular
    .module('app.allBook', [])
    .component('allBook', {
        templateUrl: 'app/views/book/allBook.html',
        controller: 'allBookCtrl'
    })
    .controller('allBookCtrl', function ($scope, $http, $window, $location) {
        let local = $location.path();  
        // 获取列表
        this.$onInit = function () {
            $scope.getBookList();
        };
        $scope.bookList = [];
        $scope.getBookList = function () {
            $http({
                method: 'GET',
                url: '/books/bookList'
            }).then((response) => {
                let res = response.data;
                $scope.bookList = res.result;

                $scope.pageLength = Math.ceil($scope.bookList.length / $scope.itemsPrePage);
                for (var i = 0; i < $scope.pageLength; i++) {
                    $scope.allPage.push(i);
                }
                console.log($scope.itemsPrePage);
            }, (error) => {
                alert('获取图书列表失败');
            });
        };

        $scope.edit = function (book) {
            book.noedit = true;
        };
        $scope.delete = function (_id) {
            $http({
                method: 'POST',
                url: '/books/delete',
                data: {
                    '_id': _id
                }
            }).then((response) => {
                let res = response.data;
                if (res.status == 'err') {
                    alert(res.result.errmsg);
                } else {
                    alert('删除成功');
                    $scope.getBookList();                                
                    $window.location.reload(local);                    
                }
            }, (error) => {
                alert('删除失败');
            });
        };
        $scope.save = function (book) {
            book.noedit = undefined;
            $http({
                method: 'POST',
                url: '/books/edit',
                data: {
                    '_id': book._id,
                    'stock': book.stock.total
                }
            }).then((response) => {
                let res = response.data;
                if (res.status == 'err') {
                    alert(res.result.errmsg);
                } else {
                    alert('保存成功');
                }
            }, (error) => {
                alert('保存失败');
            });
        };

        $scope.allPage = [];
        $scope.currentPage = 0;
        $scope.itemsPrePage = 3; // 每页显示几行数据
        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
                console.log($scope.currentPage);
            }
        };
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.allPage.length - 1) {
                $scope.currentPage++;
            }
        };
        $scope.setPage = function (page) {
            $scope.currentPage = page;
        };
    })
    .filter('offset', function () {
        return function (input, start) {
            start = parseInt(start);
            return input.slice(start);
        }
    });