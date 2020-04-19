// imports
const express = require('express');
const path = require('path');
const app = express(); // framework for nodejs
const bodyParser = require('body-parser'); // to parse the incoming object into Json
const mongoose = require('mongoose'); // interacts with the mongo db
const postsRoutes = require('./routes/posts'); // routes for CRUD on blog posts
const userRoutes = require('./routes/users'); // routes for CRUD on blog posts

// connection is created using mongoose (an external library added)
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://sakshay:7lQ198jN3i3BirQH@cluster0-hszjh.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to the database');
})
.catch(err=> {
  console.log(err, 'Can not connect to the database');
});

// parsing the incoming object into a JSON object
app.use(bodyParser.json());
// any request containing /images will be forwarded and allowed to fetch
app.use('/images', express.static(path.join('./images')));

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
