// angular
//     .module('app.pop', [])
//     // .component('myModal', {
//     //     templateUrl: 'app/components/modal.html',
//     //     controller: 'modalCtrl'
//     // })
//     .directive('popUp', function(){
//         return {
//             restrict: 'EAC',
//             templateUrl: 'app/components/popUp.html',
//             // controller: 'popCtrl',
//             replace: true,
//             transclude: true
//         }
//     })
//     .factory('instance', function(){
//         return {};
//     })
//     .controller('popCtrl', function ($scope, instance){
//         // $scope.clicks = function(x){
//         //     if(x != ''){
//         //         return 1;
//         //     }else{
//         //         return 0;
//         //     }
//         // };
//         instance.clicks = $scope.clicks();
//         alert(666);

//     });