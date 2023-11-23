const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const paymentRoutes = require ('./payment.routes.js')


const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());


app.use('/api/v1/', paymentRoutes);


app.all('*', (req, res, next) => {
return next(new Error(`Can't find ${req.originalUrl} on this server! 💀`, 404));

});


module.exports = app;
