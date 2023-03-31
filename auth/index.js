const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// Passport local strategy

exports.strategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }

    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    });
  });
});

/**
 * Serializes user into user.id
 */
exports.serializeFn = function (user, done) {
  done(null, user.id);
};

/**
 * Deserializes user.id into user
 */
exports.deserializeFn = function (id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
};
