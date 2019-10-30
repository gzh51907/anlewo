const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { lastResult } = require('../utils');

Router.route('/')
    .post(async (req, res) => {
        let { query } = req.body;
        console.log(query);
        let result = null;
        try {
            result = await mongo.create('index', [query]);
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