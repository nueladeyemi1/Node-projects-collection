const express = require('express');
const { isLoggedIn, protect } = require('../controllers/authController');
const { createBookingCheckout } = require('../controllers/bookingController');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours
} = require('../controllers/viewsController');

const router = express.Router();

// router.use(isLoggedIn);

// router.get('/', isLoggedIn, getOverview);

// router.get('/tour/:slug', isLoggedIn, getTour);

// router.get('/login', isLoggedIn, getLoginForm);

// router.get('/me', protect, getAccount);

router.get('/', createBookingCheckout, getOverview);

router.get('/tour/:slug', getTour);

router.get('/login', getLoginForm);

router.get('/me', protect, getAccount);

router.get('/my-tours', protect, getMyTours);

router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
