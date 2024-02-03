const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({
    slug: req.params.slug
  }).populate({
    // path: 'Review',
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with this name', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = async (req, res) => {
  res.status(200).render('login', {
    title: 'Login to your account'
  });
};
