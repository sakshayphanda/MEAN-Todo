// imports
const express = require('express');
const app = express(); // framework for nodejs
const bodyParser = require('body-parser'); // to parse the incoming object into Json
const mongoose = require('mongoose'); // interacts with the mongo db
const postsRoutes = require('./routes/posts'); // routes for CRUD on blog posts
const userRoutes = require('./routes/users'); // routes for CRUD on blog posts

// const userRoutes = require('./routes/users');

// connection is created using mongoose (an external library added)
mongoose.connect('mongodb+srv://sakshay:LWksC9NcIVZf6hj5@cluster0-hszjh.mongodb.net/test?retryWrites=true')
.then(() => {

  console.log('Connected to the database');
})
.catch(err=> {
  console.log(err, 'Can not connect to the database');
});

// parsing the incoming object into a JSON object
app.use(bodyParser.json());

// dealing with the CORS errors (cross platform Resource sharing). when using 2 different port addresses at the same time
app.use((request,response,next) => {
  response.setHeader("Access-Control-Allow-Origin","*");
  response.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
  response.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.use('/api/post', postsRoutes);
 app.use('/api/user', userRoutes);

//to export the module so that it can be accessed from the server.js
module.exports = app;
