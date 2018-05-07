angular
    .module('app.borrowBook', [])
    .component('borrowBook', {
        templateUrl: 'app/views/borrow/borrowBook.html',
        controller: 'borrowBookCtrl'
    })
    .controller('borrowBookCtrl', function($scope, $http) {

        this.$onInit = function () {
            //模块初始化
            $scope.visible = false;  
            departs();
        }; 
        var now = new Date();   
        var departs = function(){
                $http({
                    method: "GET",
                    url: "/departments/getparts"
                }).then((response) => {
                    let res = response.data;
                    if(res.status == "err"){
                        alert(res.result);
                        $scope.branchs = [];
                    } else {
                        $scope.branchs = res.result;  
                    }
                    });
                };    
        
        $scope.borrowBook = function(item){

            //参数说明：str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
            // function insert_flg(str,flg,sn){ 
            //     var newstr="";
            //     for(var i=0;i<str.length;i+=sn){
            //         var tmp=str.substring(i, i+sn);
            //         newstr+=tmp+flg;
            //     }
            //     return newstr;
            // }

            //将2018/5/4变成2018/05/04
            function nowtime_change(item){
                if(item.length === 10){
                    return item;
                }else if(item.length === 9){
                    let tmp = item.split("");
                    switch(tmp[6]){
                        case "/":tmp.splice(5 , 0, '0');break;
                        default: tmp.splice(8, 0, '0');break;
                    }
                    return tmp.join('');
                } else {
                    let tmp = item.split("");
                    tmp.splice(5, 0, '0');
                    tmp.splice(8, 0, '0');
                    return tmp.join('');
                }
            }

            let nowTime = now.toLocaleDateString();
            nowTime = nowtime_change(nowTime);
           // nowTime = insert_flg(nowTime, '0', 8);
            borrow_ID = item._id;
            $scope.visible = true; 
            $scope.bname = item.title;
            $scope.borrow_form = {
                "_id": borrow_ID,
                "name": "",
                "ID": "",
                "tel": "",
                "department": "",
                "now": nowTime,
                "time": ""
            };
        }

        $scope.borrow_form_close = function(){
            $scope.visible = false;
            $scope.borrow_form = {
                "_id": borrow_ID,
                "name": "",
                "ID": "",
                "tel": "",
                "department": "",
                "now":nowTime,
                "time": ""
            };   
        }


        $scope.borrow_push= function(borrow_form){
            $http({
                method: "POST",
                url: "/books/borrow",
                data: borrow_form
            }).then((response) => {
                let res = response.data;
                if (res.status == 'err') {
                    alert(res.result);
                } else {
                    alert('借书成功！');
                    $scope.searchBooks($scope.bookname);
                }
                $scope.borrow_form_close();
            }, (err) => {
                alert('借书失败！');
                $scope.borrow_form_close();
            });   
        };
        
        //搜索图书,返回图书列表
        $scope.searchBooks = function(bookname) {
            $http({
                method: 'GET',
                url: "/books/search",
                params: {
                    'title': bookname
                }
            }).then(function(response) {
                let res = response.data;
                if (res.status == "err") {
                    alert('err');
                } else if (res.result == 0) {
                    alert("未找到图书");
                } else {
                    $scope.bookList = res.result;
                }
            }, function(err) {
                alert('请检查网络');
            });
        };
    })

    .directive('borTime', () => {  //验证
        return {
            require: "ngModel",
            link: (scope, ele, attrs, ctrl) => {
                ctrl.$validators.borTime = (modelValue) => {
                        if(ctrl.$isEmpty(modelValue)) {
                            return true;
                        }
                        return new Date(modelValue).getTime() > new Date(scope.borrow_form.now).getTime()? true : false;
                }     
            }
        }
    })