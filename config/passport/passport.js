var LocalStrategy = require('passport-local');
var users = require('../../models/usersmodel');

module.exports = function(passport) {


passport.use(new LocalStrategy(
  function(username, password, done) {
    users.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));



}
