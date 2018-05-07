const express = require('express');
const router = express.Router();
const async = require('async');
const db = require('../dbApi/db');
const collection = db.get('books');
const counters = db.get('users');
const book = require("../models/book");
const user = require("../models/user");

router.get('/', (req, res) => {
    res.send('ok');
});


/************重复的的函数内容存放处********/ 
var dbSendres = (req, res, cdocs="", cerr="") => {

    return  (err, docs) => {
        if(docs) {
            res.json({
                "status": "ok",
                "result": (cdocs === "") ? docs:cdocs
            });
        } else {
            res.json({
                "status": "err",
                "result": (cerr === "") ? err:cerr
            });
        }
    }  
};
/**************************************/


router.get('/bookList', (req, res) => {
    db.getdata('books', (err, docs) => {
        if(docs) {
            res.json({
                "status": "ok",
                "result": docs
            });
        } else {
            res.json({
                "status": "err",
                "result": "can't find ang book"
            });
        }
    });
});


router.get('/topicList', (req, res) => {
    res.json({
        "status": "ok",
        "result": db.topicList
    });
});mod="all"


router.get('/overtimeList', (req, res) => {
    res.json({
        "status": "ok",
        "result": db.overtimeList
    });
});


router.post('/add', (req, res) => {
    let params = req.body;
    let option = {};
    let callback = dbSendres(req, res);
    book().add(params, option, callback);
});


router.post('/edit', (req, res) => {
    let params = req.body;
    let query = {'_id': params._id};
    let option = { 
        $set: {
            'stock.total': params.stock
        }
    };
    let callback = dbSendres(req, res);
    book().edit(query, option, callback);
});



router.post('/delete', (req, res) => {
    let params = req.body;
    let query = {'_id': params._id};
    let option = {};
    let callback = dbSendres(req, res);
    book().delete(query, option, callback);
});



//防止 title=""或者title == undefiuned 的时候,查询全面结果
router.use(/^\/[a-z]*search/, (req, res, next) => {
        const title = req.query.title;
        if (typeof(title) == "undefined" || title === "") {
            res.json({
                "status": "err",
                "result": "搜索不能为空"
            });  
        } else {
            next();
        }
});


router.use("/research", (req, res, next) => {
    const title = new  RegExp(req.query.title);
    let query = {
        "$and": [
            {"title": title},
            {"stock.size": 
                {"$gt":0}       
            }
        ]
    };
    let option = {}
    let callback = dbSendres(req, res);
    let mod = "all"
    book().getdata(query, option, callback, mod);
});


router.get('/search', (req, res) => {
    const title = new RegExp(req.query.title);
    let query = {'title': title};
    let option = {}
    let callback = dbSendres(req, res);
    let mod = "all";
    book().getdata(query, option, callback, mod);
});


//借书以后,向user添加书的_id
var Borrow_edit_user = (params) => {
    let query = {
        "name": params.name,
        "id": params.ID,
        "branch": params.department,
        "tel": params.tel
        };
    let option = {
        $push: {
            "borrow.state": {
                "bID": params._id
            },
        },"$inc":{
            "borrow.total":1
        }
    };
    let callback = () => {};
    user().edit(query, option, callback);
}




// TODO: 删掉查询部分，从前端检测是否已借完
router.post('/borrow', (req, res) => {
    let params = req.body;
    let query = {'_id': params._id};
    let option = {};
    book().getdata(query, option, (data) => {
         if(data) {
            if (data.stock.total <= data.stock.state.length) {    //判断是否借完
                res.json({
                    "status": "err",
                    "result": "book is not enough"
                });
            } else {
                let query = {"_id": params._id};
                let option = { 
                        $push : {
                            'stock.state': {
                                'reader': params.name,
                                'date': new Date(params.now).getTime(),
                                'expire': new Date(params.time).getTime()
                            }
                        },
                        $inc: {"stock.size": 1}
                };
                book().edit(query, option,  (err, docs) => {
                    if(docs) {
                        let query = {'_id': params._id};
                        let option = {$inc: {'read_count': 1}};
                        let callback = () => {};  //表示一个空函数,感觉不太好
                        book().edit(query, option, callback);

                        let query2 = { 
                            "name": params.name,
                            "id": params.ID,
                            "branch": params.department,
                            "tel": params.tel
                        };
                        user().getdata(query2, {}, (data) => {
                            if(data) {
                                Borrow_edit_user(params);
                                res.json({
                                    "status": "ok",
                                    "result": data
                                });
                            } else {
                                option = {};
                                let callback = (err, docs) => {
                                    //dbSendres(req,res, "", "插入失败");
                                    if(docs) {
                                        res.json({
                                            "status": "ok",
                                            "result": docs
                                        });
                                    } else {
                                        res.json({
                                            "status": "err",
                                            "result": err
                                        })
                                    }
                                };
                                user().add(params, {}, callback);
                            } 
                        }, "one");

                    } else {
                        res.json({
                            "status": "err",
                            "result": "书更新失败"
                        });
                    }
                });
            }
         } else {
            res.json({
                "status": "err",
                "result": "can't find this book"
            });
         }
     });     
});



router.post('/return', (req, res) => {
    let params = req.body;
    let query = {       //查找_id和reader一致的book记录
        '_id': params._id, 
        'stock.state.reader': params.reader
    };
    let option = {};
    book().getdata(query, option, (err, docs) => {      //查找到记录, docs就是记录数组
        if(docs) {     
            let query = {'_id': params._id};
            let option =  {
                $pull: {  //往books标的记录中在删除一个read
                    'stock.state': {
                        'reader': params.reader,
                    }
                }, "$inc": {                //books.stock.size减1
                        "stock.size": -1
                }
            };
            book().edit(query, option, (err, docs) => {
                if(docs) {               //docs是修改记录的列表
                    let query = {"name": params.reader};
                    let option = {
                        $pull:{
                            "borrow.state": {'bID': params._id}  //往books标的记录中在删除一个read
                        },  
                        "$inc": {"borrow.total": -1}  //books.stock.size减1
                    };
                    user().edit(query, option, (err, docs) => {
                        if(docs) {
                            res.json({
                                "status": "ok",
                                "result": docs
                            });
                        } else {
                            res.json({
                                "status": "err",
                                "result": err
                            });
                        }
                    });
                } else {
                    res.json({
                        "status": "err",
                        "result": err
                    });
                }
            });
        } else {
            res.json({
                "status": "err",
                "result": "图书或者借阅人信息错误"
            });
        }
    }, "all");
});
// 规定续借七天
var reNewDay = 7;

router.post('/renew', (req, res) => {
    let params = req.body;

    collection.findOne({
        "_id": params._id
    }).then((data) => {
        collection.update({
            "_id": params._id,
            "stock.state.reader": params.reader
        },{
            "$inc": {"stock.state.$.expire": reNewDay*24*60*60*1000}
        })
        res.json({
            "status": "ok",
            "result": data
        });
    })
    
});

module.exports = router;