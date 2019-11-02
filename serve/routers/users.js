const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { lastResult, token } = require('../utils');

// 查询所有用户
Router.get('/', async (req, res) => {
    let result = await mongo.dfind('users');
    res.send(lastResult({ data: result }));
})

//查询是否存在该用户名
Router.get('/check', async (req, res) => {
    let { phone } = req.query;
    // console.log(phone)
    let result = await mongo.dfind('users', { phone });
    if (result.length) {
        //查询成功
        res.send(lastResult({ code: 0 }));
    } else {
        // console.log(666)
        res.send(lastResult({}));
    }
})

//查询用户名头像
Router.get('/tx', async (req, res) => {
    let { phone } = req.query;
    // console.log(phone)
    let result = await mongo.dfind('users', { phone });
    if (result.length) {
        //查询成功
        res.send(lastResult({ data: result }));
    } else {
        // console.log(666)
        res.send(lastResult({ code: 0 }));
    }
})

//注册新用户
Router.post('/reg', async (req, res) => {
    let { phone, pic, nickname } = req.body;
    let result = await mongo.create('users', [{ phone, pic, nickname }]);
    if (result.ops.length) {
        //插入成功
        res.send(lastResult({}));
    } else {
        res.send(lastResult({ code: 0 }));
    }

})

//修改头像
Router.patch('', async (req, res) => {
    let { phone, pic } = req.body;
    // console.log(phone, pic);
    let result = await mongo.update('users', { phone }, { $set: { pic } });
    console.log(result.result);
    if (result.result.n) {
        //插入成功
        res.send(lastResult({}));
    } else {
        res.send(lastResult({ code: 0 }));
    }
})

//登录账号
Router.get('/login', async (req, res) => {
    // console.log(777);
    let { phone } = req.query;
    let Authorization = '';
    Authorization = token.create(phone);
    res.send(lastResult({ data: Authorization }));
})

//删除账号
Router.delete('/', async (req, res) => {
    let { phone } = req.body;
    let result = await mongo.remove('users', { phone });
    if (result.result.n > 0) {
        //删除成功
        res.send(lastResult());
    } else {
        res.send(lastResult({ code: 0 }));
    }

})

module.exports = Router;