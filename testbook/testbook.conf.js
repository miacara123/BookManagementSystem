const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    // 测试框架
    framework: 'jasmine',
    // 测试服务器接入地址
    // seleniumAddress: 'http:10.244.4.139:3000',
    // 需要运行的测试程序代码文件列表
    specs: ['testbook.spec.js'],
    baseUrl: 'http://127.0.0.1:3000',
    directConnect: true,
    chromeDriver: './node_modules/.bin/chromedriver',

    jasmineNodeOpts: {
        print: function () {} // 禁止默认的...输出
    },

    onPrepare: function () {

        let specReporter = new SpecReporter({ // add jasmine-spec-reporter
            spec: {
                displayPending: true,
                displayErrorMessages: true,
                displayStacktrace: true
            },
            summary: {
                displayErrorMessages: true
            }

        });
        // 初始化必须
        // 一个是jasmine的运行环境,是单例模式jasmine.getEnv()
        // 还有一个是将测试结果显示出来的addReporter(specReporter)
        jasmine.getEnv().addReporter(specReporter);
    }
}