const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRouter');


const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// global middlwares
// set security http headers
app.use(helmet())

// body barser, reading from body into req.body
app.use(express.json({
  limit: '10kb'
}));
// data sanitization against nosql query injection 
app.use(mongoSanitize())

//data sanitizatizion against xss
app.use(xss())
// prevent parameter pollution
app.use(hpp({
  whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']


}))
//serving static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// limit requests from same ip address
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this ip. Please try again in an hour"
})

app.use('/api', limiter)


//ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);


// * stands for everything ... considerd as an operational error
app.all('*', (req, res, next) => {
  next(new App, Error(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);
module.exports = app;
