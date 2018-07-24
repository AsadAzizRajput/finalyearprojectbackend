require('./config/config');
require('./app/db/mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary');
const port = process.env.PORT;
const app = express();
var database = mongoose.connection;
app.use(bodyParser.json());

app.use(cors());

cloudinary.config({
  cloud_name: "asadaziz", 
  api_key: "424826386583599", 
  api_secret: "CNWFgEJuoKWFZDCGjAu7SUE-lJc" 
});

//adding routes 
require('./app/routes/index')(app, database);
  app.listen(port, () => {
         console.log('Something happening on port ' + port);
   
        });
 module.exports = {app};



