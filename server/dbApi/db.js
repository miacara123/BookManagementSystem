const monk = require('monk');
const url = '10.244.4.139:27017,10.244.4.139:27027,10.244.4.139:27037/bshbook?replicaSet=rs0';

const db = monk(url);
const books = db.get('books');
const users = db.get('users');



db.then(() => {
    console.log('db ok');
});


// 姑且先写在这
// 每次启动服务的时候先获取 topicList 和 overtimeList
// 可能需要修改成每次还书的时候更新一次 overtimeList
db.then(() => {
    var now = new Date();
    const date = now.getTime();
    // overtime 指明过期多少天(单位ms)
    books.find({'stock.state': {
        $elemMatch: {
            'expire': {'$lt': date}
        }
    }}, (err, docs) => {
        if (docs) {         //docs是一个存放在查询结果对象的列表
            db.overtimeList = [];
            docs.forEach(element => {
                element.stock.state.forEach(state => {
                    db.overtimeList.push({
                        'title': element.title,
                        'reader': state.reader,
                        'overtime': state.expire - state.date
                    });
                });
            });
        } else {
            console.log("db err:\n" + err);
        }
    });

    books.find({}, {
        sort: {read_count: -1},
        limit: 10
    }, (err, docs) => {
        db.topicList = docs;
    });
});

//建议重新创建一个文件
//获取数据
db.getdata = (collectionName, query, option, callback, mod) => {
    const collection = db.get(collectionName);
    if(typeof query === 'function') {
        callback = query;
        query = {};
        option = {};
    } else if (typeof option == 'function') {
        callback = option;
        option = {};
    }
    query.del = {$ne: true};
    if(mod === "one") {
        collection.findOne(query, option).then(callback);
    } else  {
        collection.find(query, option, callback);
    }
};

//插入数据
db.insert =  (collecteName, data, option, callback) => {
    const collection = db.get(collecteName);
    if (typeof option === 'function') {
        callback = option;
        option = {};
    }
    collection.insert(data, option, callback);
};

//更新数据
db.updata = (collecteName, query, option, callback) => {
    const collection = db.get(collecteName);
    collection.update(query, option, callback);

}


db.delete = (collecteName, query, option, callback) => {
    const collection = db.get(collecteName);
    if (typeof option === 'function') {
        callback = option;
        option = {};
    }
    collection.remove(query, option, callback);

}
module.exports = db;