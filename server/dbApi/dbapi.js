import { ICollection } from 'monk';

const monk = require('monk');
const url = '10.244.4.139:27017,10.244.4.139:27027,10.244.4.139:27037/bshbook?replicaSet=rs0';
const db = monk(url)

module.exports = new DbApi();


function DbApi(config) {
    'use strict'
    var self = this;
    self.getdata = (collectionName, query, option, callback) => {
        if(typeof query === 'function') {
            callback = query;
            query = {};
            option = {};
        } else if (typeof option == 'function') {
            callback = option;
            option = {};
        }
        query.del = {$ne: true};
        const collection = db.get(collectionName);
        collection.find(query, option, callback);
    };

    
    self.delete = (collectionName, query, option, callback) => {
        const collection = db.get(collectionName);
        var update = {$set: { "del": true } };
        if(typeof query === 'function') {
            callback = query;
            query = {};
            option = {};
        } else if (typeof option == 'function') {
            callback = option;
            option = {};
        }
        collection.update(query, update,option, callback);
    };

    self.insert = function (collecteName, data, option, callback) {
        var collection = db.get(collecteName);
        if (typeof option === 'function') {
            callback = option;
            option = {};
        }
        collection.insert(data, option, callback);
    };


    self.update = function (collectName, data, option, callback) {
        var collection = db.get(collecteName);;
        var query = { _id: data._id };
        var update = { $set: data };
        if (typeof option === 'function') {
            callback = option;
            option = {};
        }
        collection.update(query, update, option, callback);
    };

};