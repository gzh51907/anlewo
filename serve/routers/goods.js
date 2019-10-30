const express = require('express');
const Router = express.Router();
const { mongo } = require('../db');
const { lastResult } = require('../utils');

Router.route('/guide')
    .get(async (req, res) => { //查
        let { num, pages, sort, des } = req.query;
        // console.log(num, pages, sort, des);
        let result = null;
        try {
            result = await mongo.find('guide', pages, num, sort, des);
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })

Router.route('/comment')
    .get(async (req, res) => { //查
        let { num, pages, sort, des } = req.query;
        // console.log(num, pages, sort, des);
        let result = null;
        try {
            result = await mongo.find('comment', pages, num, sort, des);
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })

Router.route('/sight')
    .get(async (req, res) => { //查
        let { guideId } = req.query;
        let result = null;
        try {
            result = await mongo.bfind('sight', { guideId: guideId - 0 });
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })

Router.route('/tour')
    .get(async (req, res) => { //查
        let { num, pages, sort, tage, des, dy, xy } = req.query;
        let result = null;
        try {
            result = await mongo.afind('tour', pages, num, tage, sort, des, dy, xy);
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })

Router.route('/xq/*')
    .get(async (req, res) => { //查
        let { id, coll, tage } = req.query;
        // console.log(id, coll, tage)
        let result = null;
        try {
            result = await mongo.cfind(coll, id, tage);
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })

Router.route('/other')
    .get(async (req, res) => { //查
        let { nickname } = req.query;
        // console.log(id)
        let result = null;
        try {
            result = await mongo.dfind('tour', {nickname});
        } catch (err) {
            result = err;
        }
        res.send(lastResult({ data: result }));
    })

module.exports = Router;