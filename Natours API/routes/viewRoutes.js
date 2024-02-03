const express = require('express');
const { isLoggedIn, protect } = require('../controllers/authController');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount
} = require('../controllers/viewsController');

const router = express.Router();

// router.use(isLoggedIn);

// router.get('/', isLoggedIn, getOverview);

// router.get('/tour/:slug', isLoggedIn, getTour);

// router.get('/login', isLoggedIn, getLoginForm);

// router.get('/me', protect, getAccount);

router.get('/', getOverview);

router.get('/tour/:slug', getTour);

router.get('/login', getLoginForm);

router.get('/me', protect, getAccount);

module.exports = router;
