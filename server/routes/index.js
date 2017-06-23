var express = require('express');
var router = express.Router();
const createData = require('../../dataWrangling/schema.js');
const path = require('path');
const indexReact = path.resolve(__dirname + '../../client/')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/data', (req,res, next) => {
	res.json(createData());
});

module.exports = router;
