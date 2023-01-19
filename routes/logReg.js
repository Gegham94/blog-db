const express = require('express');
const UserController = require('../controllers/UserController')
const router = express.Router();

// GET LOGIN page
router.get('/login', (req, res, next) => {
  return res.render('users/login',{title: 'Login'});
});

// GET REGISTER page
router.get('/register', (req, res, next) => {
  
  return res.render('users/register', {title: 'Register'});
});


// // POST REGISTER page
router.post('/register', (req, res, next) => {
  const user = new UserController(req, res, next);
  user.createUser();

  res.end();
});



// POST LOGIN page
router.post('/login', (req, res, next) => {

  return res.redirect('/', {title: 'Home'});
  
});

module.exports = router;