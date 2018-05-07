const express = require("express");
const router = express.Router();
const path = require("path");

   //首页路由
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
});

module.exports = router;