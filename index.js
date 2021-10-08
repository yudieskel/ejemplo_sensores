const express = require('express');
require('dotenv').config();

const { router: sensorsRouter } = require('./routes/sensors');
const { router: measuresRouter } = require('./routes/measures');

const app = express();
const PORT =  4000;

//Parse application/json
app.use( express.json() );
//Parse application/x-www-form-urlencoded 
app.use( express.urlencoded( {extended: true} ) );

app.use('/sensors', sensorsRouter);
app.use('/measures', measuresRouter);

app.listen(PORT, function () {
  console.log(`El servidor quedo corriendo en el puerto ${PORT}`);
});