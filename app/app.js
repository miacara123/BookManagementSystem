const app = angular.module('myApp', [
    'ui.router',
    'app.header',
    'app.home',
    'app.book',
    'app.allBook',
    'app.addBook',
    'app.borrow',
    'app.borrowBook',
    'app.returnBook',
    'app.reader',
    'app.allReader',
    'app.loginReader'
]);
    
app.controller('appCtrl', function() {
    
});

app.filter('toLocaleDateString', function() {
    return function(date) {
        return new Date(date).toLocaleDateString();
    };
});

app.filter("addTodays",function(){
    return function(text){
        return text + "天";
    }
});

// ui-router 配置
app.config(function($stateProvider, $urlRouterProvider) {
    const homeState = {
        name: 'home',
        url: '/',
        component: 'home'
    };  
    const bookState = {
        name: 'book',
        url: '/book',
        component: 'book'
    };
    const borrowState = {
        name: 'borrow',
        url: '/borrow',
        component: 'borrow'
    };
    const readerState = {
        name: 'reader',
        url: '/reader',
        component: 'reader'
    };
    // book 子路由
    const allBookState = {
        name: 'book.allBook',
        url: '/allBook',
        component: 'allBook'
    };
    const addBookState = {
        name: 'book.addBook',
        url: '/addBook',
        component: 'addBook'
    };

    // borrow 子路由
    const borrowBookState = {
        name: 'borrow.borrowBook',
        url: '/borrowBook',
        component: 'borrowBook'
    };
    const returnBookState = {
        name: 'borrow.returnBook',
        url: '/returnBook',
        component: 'returnBook'
    };

    // reader 子路由
    const allReaderState = {
        name: 'reader.allReader',
        url: '/allReader',
        component: 'allReader'
    };
    const loginReaderState = {
        name: 'reader.loginReader',
        url: '/loginReader',
        component: 'loginReader'
    };

    $urlRouterProvider.otherwise('/');

    $stateProvider
            .state(homeState)
            .state(bookState)
            .state(borrowState)
            .state(readerState)
            .state(borrowBookState)
            .state(returnBookState)
            .state(allBookState)
            .state(addBookState)
            .state(allReaderState)
            .state(loginReaderState);
        
});