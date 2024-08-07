var express = require('express');
var router = express.Router();
// var products = require('./products.model');
let products = require('../public/jsondata/products.json');

router.get('/', async function(req, res, next) {
  res.status(400).json(products);
});


module.exports = router;
