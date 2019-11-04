const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { lastResult } = require('../utils');

Router.route('/index')
    .get(async (req, res) => { //查
        let result = null;
        try {
            result = await mongo.dfind('index');
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })

Router.route('/tyg')
    .get(async (req, res) => { //查
        let { num, page, query } = req.query;
        // console.log(num, page, query);
        let result = null;
        try {
            result = await mongo.bfind('tyg', page, num, { query });
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })

Router.route('/list')
    .get(async (req, res) => { //查
        let { num, page, query } = req.query;
        console.log(req.query);
        let result = null;
        try {
            result = await mongo.bfind('listb', page, num, { query });
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })

Router.route('/')
    .delete(async (req, res) => { //查
        let { goodsId } = req.query;
        // console.log(req.query);
        let result = null;
        try {
            result = await mongo.remove('listb', { goodsId: goodsId - 0 });
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
    })


Router.route('/detail')
    .get(async (req, res) => { //查
        let { goodsId } = req.query;
        // console.log(num, page, query);
        let result = null;
        try {
            result = await mongo.dfind('listb', { goodsId: goodsId - 0 });
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })


module.exports = Router;