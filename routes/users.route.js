// modules
const router = require('express').Router();

// controller
const {
  users
} = require('../controllers');

// middlewares
const {
  rateLimiter
} = require('../lib/middlewares/limiter.middleware');

const {
  // adminAccess,
  jwtAuth
} = require('../lib/middlewares/auth.middleware');

// routing
router.get('/users', rateLimiter, /* jwtAuth */ users.getUsers);

router.post('/users', rateLimiter, /* jwtAuth */ users.createUser);

router.delete('/users', rateLimiter, jwtAuth, users.deleteUser);

router.put('/me/profile', rateLimiter, users.updateProfile);

module.exports = router;