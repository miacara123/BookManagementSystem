
// spec.js

// describe定义一个测试案例集，it为单个测试案例
describe('Protractor Demo App', function () {

    it('首页功能', function () {
        // browser是通过protractor创建expect的全局变量,用于浏览器范围的命令控制,比如tonguebrowser.get进行导航
        // browser.get 跳转到指定页面,还会重新刷新整个页面
        browser.get('/');
        // 测试两者值是否相等,相等则测试通过,不相等则测试失败
        expect(browser.getTitle()).toEqual('Book System');
        expect($("div.box-list div.quick-list .box-title").getText()).toEqual("快捷方法");
        element.all(by.css('div.box-list div.quick-list .box-item')).get(1).click();

        // browser.pause(); // 让浏览器停下来
        
    });

    it('增加图书', function(){
        browser.get('#!/book/addBook');

        element(by.model("title")).sendKeys('小猪佩奇');
        element(by.model("author")).sendKeys('hyl');
        element(by.model("press")).sendKeys('新华出版社');
        element(by.model("stock")).sendKeys('6');
        element(by.css("[ng-click='add()']")).click();

        expect(browser.switchTo().alert().getText()).toEqual('添加成功');
        browser.switchTo().alert().accept();
    })

    it('所有图书', function(){
        browser.get('#!/book/allBook');

        element(by.css("[ng-click='nextPage()']")).click();
        element(by.css("[ng-click='nextPage()']")).click();
        $(".allbook tr:nth-of-type(2) td:nth-of-type(7) .btn-warning").click();
        var target = element.all(by.model('book.stock.total')).filter(function(ele, index){
            return ele.getAttribute('ng-disabled').then(function(text){
                return text == 'true';
            })
        });
        target.sendKeys(protractor.Key.ARROW_DOWN);
        $(".allbook tr:nth-of-type(2) td:nth-of-type(7) .btn-success").click();  
        expect(browser.switchTo().alert().getText()).toEqual('保存成功');
        browser.switchTo().alert().accept();

        $(".allbook tr:nth-of-type(3) td:nth-of-type(7) .btn-danger").click();
        expect(browser.switchTo().alert().getText()).toEqual('删除成功');
        browser.switchTo().alert().accept();

        
    })

    it('所有读者', function () {
        browser.get('#!/reader/allReader');

        element(by.css(".hcp")).click();
        element(by.css("body")).click();

        // browser.pause();        
        
    });

});