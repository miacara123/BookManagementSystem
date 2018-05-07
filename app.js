const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());  // (post)解析req中的body数据json数据 ,解析玩就放在req.body中
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/app', express.static('app'));

//引入路由文件
const server = require("./server");
app.use("/", server);

// 应该不是很好的方法
app.use('/node_modules', express.static('node_modules'));

module.exports = app;
