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


passport.serializeUser(function(user, done) {
	console.log('serialize user: ',user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log('deserialize user:', id);
  users.findById(id, function (err, user) {
    done(err, user);
  });
});
}
