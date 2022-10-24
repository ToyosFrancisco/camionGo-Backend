// modules
const router = require("express").Router();

// controller
const { informacion } = require("../controllers");

// middlewares
const { jwtAuth } = require("../lib/middlewares/auth.middleware");

const { rateLimiter } = require("../lib/middlewares/limiter.middleware");

const {
  imageUpload,
  uploader,
} = require("../lib/middlewares/multer.middleware");

// routing
router.get("/informacion", rateLimiter, informacion.get);
router.post(
  "/informacion",
  rateLimiter,
  jwtAuth,
  uploader.single("imagen"),
  informacion.create
);
router.put("/informacion", rateLimiter, jwtAuth, informacion.update);
router.delete("/informacion", rateLimiter, jwtAuth, informacion.remove);

/* router.post('/informacion/image', rateLimiter,imageUpload.single('image'), informacion.uploadImage); */

module.exports = router;