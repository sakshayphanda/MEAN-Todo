const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs'); // for encrypting the passwords entered by user
const jwt = require('jsonwebtoken');

router.post('/signup', (request, response, next) =>  {
  bcrypt.hash(request.body.password, 10)
  .then(
    userPassword => {
      const user = new User({
        email: request.body.email,
        password: userPassword,
      });

      user.save().then(
        result => {
          response.status(201).json({
            message: 'Successfully created',
          result: result});
        }
      )
      .catch(
        err => {
          response.status(500).json({
            message: err
          });
        }
      );
    }
  );
});

router.post('/login', (request, response, next) => {
  let userCurrent;
  User.findOne({email: request.body.email})
  .then(
    user => {
      userCurrent = user;
      if(!user) {
        response.status(401).json({message: 'shuru me hi Failed'});
      }

      bcrypt.compare(request.body.password, user.password)
      .then(
        result => {
          if(!result) {
            return response.status(401).json({message: 'compare Failed'});
          }

          const token = jwt.sign({email: userCurrent.email, userId: userCurrent._id},
            'Sakshayphanda_this_stringshouldbelonger',
            {
              expiresIn: '1h'
            }
          );

          return response.status(200).json({token: token});

        }
      )
      .catch(
        err => {
          response.status(401).json({message: 'catch Failed'});
        }
      );
    }
  );
});

module.exports = router;

