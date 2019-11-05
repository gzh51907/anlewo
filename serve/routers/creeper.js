const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { lastResult } = require('../utils');

Router.route('/')
    .post(async (req, res) => {
        let query = req.body;
        // console.log(req.body);
        let result = null;
        try {
            let arr = query.items;
            console.log(arr);
            result = await mongo.create('tyg', arr);
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
    });

module.exports = Router;