const express = require('express');
const router = express.Router();
const {recipes} = require('../models/data')

router.get('/', (req, res, next) => {
  res.render('recipes/recipes', {
    recipes
  });
});

router.get('/:id', (req, res, next) => {
  
  const recipe = recipes.find((obj) => Number(obj.id) === Number(req.params.id))
  res.render('recipes/recipe', {
    recipe
  });
});

module.exports = router;
