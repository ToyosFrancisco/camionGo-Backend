
// modules
const router = require('express').Router();

// controller
const {
  auth
} = require('../controllers');

// middlewares
const {
  localAuth
} = require('../lib/middlewares/auth.middleware');

const {
  rateLimiter
} = require('../lib/middlewares/limiter.middleware');

// routing /auth
router.post('/login', rateLimiter, localAuth, auth.localAuth);
router.post('/loginAdmin', rateLimiter, localAuth, auth.localAdminAuth);
// remove this route, it's not necessary for this application
// all users crud will be managed by /api/users routes
// router.post('/register', rateLimiter, auth.register);

module.exports = router;