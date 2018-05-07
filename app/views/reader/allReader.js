angular
    .module('app.allReader', [])
    .component('allReader', {
        templateUrl: 'app/views/reader/allReader.html',
        controller: 'allReaderCtrl'
    })
    .controller('allReaderCtrl', ['$scope', '$http', function ($scope, $http) {

        this.$onInit = function () {
            $scope.getReaderList();
        }
        $scope.readerList = [];
        // $scope.books = {};

        // 获取读者数据库
        $scope.getReaderList = function () {
            $http({
                method: 'GET',
                url: '/users/readerList'
            }).then((response) => {
                let res = response.data;
                $scope.readerList = res.result;
                // 页数=总的读者数据/每行要显示的数据量
                $scope.pageLength = Math.ceil($scope.readerList.length / $scope.itemsPrePage);
                for (var i = 0; i < $scope.pageLength; i++) {
                    // 将页号存储进allPage数组中
                    $scope.allPage.push(i);
                }

            }, (error) => {
                alert('获取读者信息错误！');
            })
        };

        $scope.detail = function (r) {
            $http({
                method: 'GET',
                url: '/users/borrowing',
                params: r // 将点击的当前的这条读者信息传到后台
            }).then((response) => {
                let res = response.data;
                $scope.books = res.result;
            })
            
            // 借书时间
            // state数组中存放每个借书人 把每个借书人对象以arr传入进来 找到匹配点击的那个读者的信息
            $scope.getDate = function (arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (r.name == arr[i].reader) {
                        console.log(typeof arr[i].reader);
                        var date = arr[i].date
                        return new Date(date).toLocaleDateString();
                    }
                }
            };

            // 还书时间
            $scope.getExpire = function (arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (r.name == arr[i].reader) {
                        console.log(typeof arr[i].reader);
                        var date = arr[i].expire
                        return new Date(date).toLocaleDateString();
                    }
                }
            };

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
        // 设置当前点击的页码为高亮状态
        $scope.setPage = function (page) {
            $scope.currentPage = page;
        };

    }])
    // 自定义filter
    .filter('offset', function () {
        // input 需要过滤的对象,start 过滤器参数1,过滤器参数2..
        return function (input, start) {
            start = parseInt(start);
            // 在读者列表中,从第start位置开始截取到最后
            return input.slice(start);
        }
    });