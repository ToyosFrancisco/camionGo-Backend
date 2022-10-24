// modules
const passport = require('passport');

module.exports = {
  jwtAuth(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      console.log(err, user);
      if (!!err) {
        return res.failure(-1, err, 500);
      } else if (!user) {
        return res.failure(-1, info.message, 401);
      }

      req.logIn(user, (err) => {
        if (!!err) {
          return next(err);
        };

        return next();
      });
    })(req, res, next);
  },

  localAuth(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (!!err) {
        return res.failure(-1, err, 500);
      } else if (!user) {
        return res.failure(-1, info.error, 500);
      }
  
      req.logIn(user, (err) => {
        if (!!err) {
          return next(err);
        }
  
        return next();
      });
    })(req, res, next);
  },

  adminAccess(req, res, next) {
    const { role } = req.user;

    if (role !== 'admin') {
      return res.failure(-1, 'admin access needed', 403);
    }

    return next();
  }
};