const express = require('express');
const router = express.Router();
const async = require('async');
const db = require('../dbApi/db');
const collection = db.get('books');
const counters = db.get('users');

router.get('/', (req, res) => {
    res.send('ok');
});

router.get('/readerList', (req, res) => {
    // 选择借书数量在0本以上的读者
    counters.find({
        "borrow.total": {$gt: 0}
    }).then((data) => {
        if (data) {
            console.log(data);
            res.json({
                "status": "ok",
                "result": data
            });
        } else {
            res.json({
                "status": "err",
                "result": "can't find any reader"
            });
        }
    });
});

router.get('/borrowing', (req, res) => {
    let params = JSON.parse(req.query.borrow);
    async.map(params.state, (item, callback) => {
        collection.findOne({
            '_id': item.bID
        }).then((data) => {
            // dataArr.push(data);
            // console.log(data);
            callback(null, data);
        })
    }, (err, results) => {
        // 这里的results是array形式,因为map遍历数组时,是将结果以数组形式返回
        res.json({
            "status": "ok",
            "result": results
        });
    })
});

module.exports = router;