const jwt = require('jwt-simple');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
require('dotenv').config();

const storage = {};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET_KEY
};
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  if (storage[payload.sub]) done(null, true);
  // find username in database!
  else done(null, false);
});

passport.use(jwtAuth);

exports.requireJWTAuth = passport.authenticate('jwt', { session: false });

exports.getSignUp = (req, res, next) => {
  res.render('sign-up', { path: '/sign-up' });
};

exports.getSignIn = (req, res, next) => {
  res.render('sign-in', { path: '/sign-in' });
};

exports.loginMiddleware = (req, res, next) => {
  const { username, password } = req.body;

  if (storage[username] && storage[username] === password) {
    const payload = {
      sub: username,
      iat: new Date().getTime() // issued at time
    };
    const secret = process.env.SECRET_KEY;
    res.send(jwt.encode(payload, secret));
  } else res.send('Wrong username and password');
};

exports.signUpMiddleware = (req, res, next) => {
  const { username, password } = req.body;

  storage[username] = password;
  res.send('success');
};
