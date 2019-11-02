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
        let { query } = req.query;
        // console.log(num, page, query);
        let result = null;
        try {
            result = await mongo.dfind('listb', query);
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
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