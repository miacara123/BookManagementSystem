const express = require("express");
const router =  express.Router();

//路由目的文件导入
const index = require("./routes/index");
const books = require('./routes/books');
const users = require('./routes/users');
const departments = require('./routes/departments');

router.use('/', index);
router.use('/books', books);
router.use('/users', users);
router.use('/departments', departments);


module.exports = router;