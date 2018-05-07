const express = require("express");
const router = express.Router();
const db = require('../dbApi/db');
const collection = db.get('departments');

router.get('/getparts', (req,res) => {
    collection.find({}).then((data)=> {
        if(data){
            res.json({
                "status":"ok",
                "result": data
            });
        };
    });
});

module.exports = router;