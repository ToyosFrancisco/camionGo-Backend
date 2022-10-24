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
router.put('/users', rateLimiter, jwtAuth, users.editUser);

router.get('/me/profile', rateLimiter, jwtAuth, users.getProfile);
router.put('/me/profile', rateLimiter, jwtAuth, users.updateProfile);

router.put('/me/password', rateLimiter, jwtAuth, users.updatePassword);


router.put('/recoveryPassUser', rateLimiter, /* jwtAuth */ users.createNewPass);
router.post("/recoveryPass", rateLimiter, users.sendEmail);

module.exports = router;