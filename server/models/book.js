const db = require("../dbApi/db");
const modelDbName = "books";

function createBook() { 
    var app = new Book();
    return app;
}

//因为使用的new, 所以Book()是一个构造函数
function Book(){
    'use strict';

    var self = this;

    self.obj = (params) => {
        return {
                'title': params.title,
                'author': params.author,
                'press': params.press,
                'read_count': 0,
                'stock': {
                    'total': params.stock,
                    'state': [],
                    'size':0
                }
            };
        };


    self.add = (data, option, callback) => {
        let obj = self.obj(data);
        db.insert(modelDbName, obj, option,callback);
    };


    self.edit = (query, option, callback) => {
        db.updata(modelDbName, query, option, callback);
    };

    
    self.delete = (query, option, callback) => {
        db.delete(modelDbName, query, option,  callback);
    };


    self.getdata = (query, option, callback, mod="one") => {
        db.getdata(modelDbName ,query, option, callback, mod);
    }; 
}


exports = module.exports = createBook;
