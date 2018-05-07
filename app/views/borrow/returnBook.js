angular
    .module('app.returnBook', [])
    .component('returnBook', {
        templateUrl: 'app/views/borrow/returnBook.html',
        controller: 'returnBookCtrl'
    })
    .controller('returnBookCtrl', function($scope, $http, $window, $location) {
        let local = $location.path();  
        $scope.returnBook = function(_id, reader) {
            if (!confirm('确认还书?')) {
                return;
            }
            $http({
                method: 'POST',
                url: '/books/return',
                data: {
                    '_id': _id,
                    'reader': reader
                }
            }).then((response) => {
                let res = response.data;
                if (res.status == 'err') {
                    alert(res.result);
                } else {
                    alert('还书成功！');
                    $window.location.reload(local);                                                     
                }
            }, (error) => {
                alert('还书失败！');
            });
        };

        $scope.renew = function(_id, reader){
            if (!confirm('确认续借?')) {
                return;
            }
            $http({
                method: 'POST',
                url: '/books/renew',
                data: {
                    '_id': _id,
                    'reader': reader
                }
            }).then((response) => {
                let res = response.data;
                if (res.status == 'err') {
                    alert(res.result);
                } else {
                    $http({
                        method: "GET",
                        url: "/books/research",
                        params: {
                            'title': $scope.bookname
                        }
                    }).then((response) => {
                            let res = response.data;
                            if(res.status == "err") {
                                alert("续借失败! ");
                            } else{
                                $scope.bookList = res.result;
                                res.result.forEach(element => {
                                    if(element._id == _id){
                                        $scope.regive_item(element);
                                    }
                                });           
                                alert('成功续借七天！');
                            }
                        })
                    
                    
                    //$window.location.reload(local);  
                }
            }, (error) => {
                alert('续借失败！');
            });
        }

        // 根据书名搜索
        $scope.sborbooks = function(bookname) {
            $http({
                method: "GET",
                url: "/books/research",
                params: {
                    'title': bookname
                }
            }).then(function(response) {
                let res  = response.data;
                if (res.status == "err") {
                    alert("查询没有结果");
                } else {
                    $scope.bookList = res.result;
                }
            }, function(error) {
                alert("请检查网络");
            });
        };


        //点击归还按键,把item传给弹出框
        $scope.give_item = (citem) => {
            $scope.item = citem;
        };

        $scope.regive_item = (citem) => {
            $scope.item = citem;
        };
    });