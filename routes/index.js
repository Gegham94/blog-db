const express = require('express');
const router = express.Router();
const {recipes} = require('../models/data')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/contact', (req, res, next) => {
  res.render('contact');
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

module.exports = router;
