const express = require('express');
const Router = express.Router();
const { lastResult, token } = require('../utils');
const goodsRouter = require('./goods');
const usersRouter = require('./users');
const cartRouter = require('./cart');
const tourRouter = require('./tourinf');
const creeperRouter = require('./creeper');

Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");
    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else {
        next();
    }
})


Router.use(express.urlencoded({ extended: true }), express.json());//推导：内部自动调用next

Router.use('/goods', goodsRouter);
Router.use('/users', usersRouter);
Router.use('/cart', cartRouter);
Router.use('/change', tourRouter);
Router.use('/creeper', creeperRouter);
Router.get('/verify', (req, res) => {
    let Authorization = req.get('Authorization');
    let result = token.verify(Authorization);
    res.send(lastResult({ code: result ? 1 : 0 }));
});

module.exports = Router;