const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { lastResult } = require('../utils');
const path = require('path');
const multer = require('multer');

let newname = '';

// DiskStorage
var storage = multer.diskStorage({
    // 上传文件保存目录，无则自动创建
    destination: '../static/',
    // 设置上传目录(如果uploads目录不存在，则报错)
    // destination: function (req, file, cb) {
    //     cb(null, 'uploads/')
    // },
    // 重命名文件名（必须使用回调函数cb）
    filename: function (req, file, cb) {
        //获取文件后缀
        let ext = path.extname(file.originalname);
        newname = file.fieldname + '-' + Date.now() + ext;
        cb(null, newname)
    }
})

var upload = multer({ storage });

// 上传图片
Router.post('/pic', upload.single('gd'), (req, res) => {
    // upload.single()会对上传的图片进行处理，并设置到req.file属性中
    // console.log(req.file)
    // let data = {
    //     imgurl: `../../../static/${newname}`
    // }
    let data = req.file;
    res.send(lastResult({ data }));
})


Router.route('/')
    .post(async (req, res) => {
        let { query } = req.body;
        let result = null;
        try {
            result = await mongo.create('listb', [query]);
            if (result.ops.length) {
                //插入成功
                res.send(lastResult({}));
            } else {
                res.send(lastResult({ code: 0 }));
            }
        } catch (err) {
            res.send(lastResult({ code: 0 }));
            res.sendStatus(200);
        }
    })
    .patch(async (req, res) => {
        let { goodsId, query } = req.body;
        let result = null;
        try {
            result = await mongo.update('listb', goodsId, { $set: query });
            console.log(result.result);
            if (result.result.n > 0) {
                //修改成功
                res.send(lastResult({}));
            } else {
                res.send(lastResult({ code: 0 }));
            }
        } catch (err) {
            res.send(lastResult({ code: 0 }));
            res.sendStatus(200);
        }
    })
    .delete(async (req, res) => {
        let { goodsId } = req.query;
        console.log(goodsId);
        let result = null;
        try {
            result = await mongo.remove('listb', goodsId);
            if (result.result.n > 0) {
                //删除成功
                res.send(lastResult({}));
            } else {
                res.send(lastResult({ code: 0 }));
            }
        } catch (err) {
            res.send(lastResult({ code: 0 }));
            res.sendStatus(200);
        }
    });

module.exports = Router;