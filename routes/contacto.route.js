// modules
const router = require("express").Router();

// controller
const { contacto } = require("../controllers");

// middlewares
const { jwtAuth } = require("../lib/middlewares/auth.middleware");

const { rateLimiter } = require("../lib/middlewares/limiter.middleware");

// routing

router.post("/contacto", rateLimiter, contacto.send);

module.exports = router;
