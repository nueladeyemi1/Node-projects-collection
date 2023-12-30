const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('Uncaught exception, shutting down...!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');
// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    // console.log(con.connections);
  });

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(con => {
//     console.log(con.connections);
//   });

// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'A tour must have a name'],
//     unique: true
//   },
//   rating: {
//     type: Number,
//     default: 4
//   },
//   price: {
//     type: Number,
//     required: [true, 'A tour must have a price']
//   }
// });

// const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 497
// });

// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const port = process.env.PORT || 3000;
// const port = 8000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('Unhandled rejection, shutting down...!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
