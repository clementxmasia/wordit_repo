var express = require("express");
var db = require("../db");
var notify = require("../notify");
var router = express.Router();
var util = require('util');
var query = util.promisify(db.query).bind(db);

/* get sentence suggestions */
const do_get_all_words = async function (res) {
  let rows = await query(
    `
    SELECT * FROM word w;
    `, []
  );

  let word_types = await query(
    `
    SELECT DISTINCT w.type FROM word w;
    `, []
  );

  res.send({ msg: 'done', rows: rows, word_types: word_types, status: 0 });
}

router.post('/all', async function (req, res, next) {
  try {
    await do_get_all_words(res,);
  } catch (err) {
    notify.sendError(res);
    console.log(err);
  }
});

module.exports = router;
