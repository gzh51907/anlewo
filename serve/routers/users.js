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
    let { age } = req.query;
    let result = await mongo.dfind('users', { age: age * 1 });
    if (result.length) {
        //查询成功
        res.send(lastResult({ code: 0 }));
    } else {
        res.send(lastResult({}));
    }
})

//注册新用户
Router.post('/reg', async (req, res) => {
    let { age, passs } = req.body;
    let result = await mongo.create('users', [{ age, passs, regtime: Date.now() }]);
    if (result.ops.length) {
        //插入成功
        res.send(lastResult({}));
    } else {
        res.send(lastResult({ code: 0 }));
    }

})

//登录账号
Router.post('/login', async (req, res) => {
    let { age, passs, mdl } = req.body;
    let result = await mongo.dfind('users', { age: age - 0, passs });
    if (result.length) {
        //查询成功
        let Authorization = '';
        if (mdl == 1) {
            Authorization = token.create(age);
            res.send(lastResult({ data: Authorization }));
        } else {
            res.send(lastResult());
        }
    } else {
        res.send(lastResult({ code: 0 }));
    }

})

//删除账号
Router.delete('/', async (req, res) => {
    let { age } = req.body;
    let result = await mongo.remove('users', { age });
    if (result.result.n > 0) {
        //删除成功
        res.send(lastResult());
    } else {
        res.send(lastResult({ code: 0 }));
    }

})

module.exports = Router;