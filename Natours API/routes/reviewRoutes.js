const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllReviews,
  createReview
} = require('../controllers/reviewController');
const router = require('./tourRoutes');

const router = express.Router({ mergeParams: true });

router.route
  .get('/', getAllReviews)
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
