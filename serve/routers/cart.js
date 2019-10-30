const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { lastResult } = require('../utils');

Router.route('/')
    .get(async (req, res) => { //查
        let { _id } = req.query;
        let result = null;
        try {
            if (_id) {
                result = await mongo.dfind('cart', { _id });
            } else {
                result = await mongo.dfind('cart');
            }
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })
    .post(async (req, res) => {
        let { query } = req.body;
        let result = null;
        try {
            result = await mongo.create('cart', [query]);
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
    .delete(async (req, res) => {
        let { _id } = req.query;
        console.log(_id)
        let result = await mongo.remove('cart', { _id });
        if (result.result.n > 0) {
            //删除成功
            res.send(lastResult({}));
        } else {
            res.send(lastResult({ code: 0 }));
        }
    })
    .patch(async (req, res) => {
        let { _id, data } = req.body;
        let result = await mongo.update('cart', { _id }, { data });
        if (result.ops.length) {
            //插入成功
            res.send(lastResult({}));
        } else {
            res.send(lastResult({ code: 0 }));
        }
    });

module.exports = Router;