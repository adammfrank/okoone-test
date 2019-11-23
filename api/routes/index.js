var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
const ctrlArticle = require('../controllers/article');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/articles', ctrlArticle.store);
router.get('/articles', ctrlArticle.list);
router.get('/articles/:_id', ctrlArticle.get);
router.put('/articles/:_id', ctrlArticle.update);
router.delete('/articles/:_id', ctrlArticle.delete);

router.get('/test', function (req, res) {
  return res.status(200).send('TEST SUCCESSFUL');
});

module.exports = router;
