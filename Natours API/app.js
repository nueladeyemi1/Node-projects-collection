const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
// const { parseConnectionUrl } = require('nodemailer/lib/shared');

const app = express();

// Set security HHTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  mesage: 'Too many requests from this IP, please try again in an hour.'
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against noSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   next();
// });

// Test middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

//ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`));
});

app.use(globalErrorHandler);

module.exports = app;
