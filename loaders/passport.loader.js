// modules
const passport = require('passport');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
// services
const { users } = require('../services');

module.exports = {
  create() {
    // local strategy
    passport.use(new LocalStrategy({
      usernameField: 'email'
    }, async (username, password, done) => {
      const user = await users.getByField({ email: username }, false);

      if (!user || !await user.comparePassword(password)) {
        return done(null, false, { error: 'Error en email o contraseña'});
      }

      return done(null, user);
    }));
    
    // jwt strategy
    passport.use(new JwtStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
      if (await users.getById(jwt_payload.sub)) {
        return done(null, jwt_payload);
      }

      return done(null, false);
    }));

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    return true;
  },

  start(server) {
    server.use(passport.initialize());
    return true;
  }
};