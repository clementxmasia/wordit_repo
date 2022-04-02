var express = require("express");
var db = require("../db");
var notify = require("../notify");
var router = express.Router();
var util = require('util');
var query = util.promisify(db.query).bind(db);

/* get sentence suggestions */
const do_get_suggestions = async function (res, sentence) {
    let rows = await query(
        //`SELECT * FROM sentence WHERE description LIKE '%${sentence}%'`, []
        `SELECT * FROM sentence`, []
    );
    console.log('sentence:', sentence)
    res.send({ msg: 'done', rows: rows, status: 0 });
}

/* get sentence suggestions */
const do_add_sentence = async function (res, sentence) {
    let rows = await query(
        `
        INSERT INTO sentence (description) VALUES (?);
        `, [sentence]
    );
    res.send({ msg: 'sentence added', status: 0 });
}

router.post('/suggestion', async function (req, res, next) {
    try {
        await do_get_suggestions(res, req.body.sentence);
    } catch (err) {
        notify.sendError(res);
        console.log(err);
    }
});

router.post('/add', async function (req, res, next) {
    try {
        await do_add_sentence(res, req.body.sentence);
    } catch (err) {
        notify.sendError(res);
        console.log(err);
    }
});

module.exports = router;
