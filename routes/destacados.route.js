// modules
const router = require("express").Router();

// controller
const { destacados } = require("../controllers");

// middlewares
const { jwtAuth } = require("../lib/middlewares/auth.middleware");

const { rateLimiter } = require("../lib/middlewares/limiter.middleware");

const {
  imageUpload,
  uploader,
} = require("../lib/middlewares/multer.middleware");

// routing
router.get("/destacados", rateLimiter, destacados.get);
router.post(
  "/destacados",
  rateLimiter,
  jwtAuth,
  uploader.single("imagen"),
  destacados.create
);
router.put(
  "/destacados",
  rateLimiter,
  jwtAuth,
  destacados.update
);
router.put("/destacadosImage", rateLimiter,jwtAuth, uploader.single("imagen"),destacados.uploadImage)


router.delete("/destacados", rateLimiter, jwtAuth, destacados.remove);

/* router.post('/destacados/image', rateLimiter,imageUpload.single('image'), destacados.uploadImage); */

module.exports = router;
