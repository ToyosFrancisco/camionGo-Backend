// modules
const router = require("express").Router();

// controller
const { novedades } = require("../controllers");

// middlewares
const { jwtAuth } = require("../lib/middlewares/auth.middleware");

const { rateLimiter } = require("../lib/middlewares/limiter.middleware");

const {
  imageUpload,
  uploader,
} = require("../lib/middlewares/multer.middleware");

// routing
router.get("/novedades", rateLimiter, novedades.get);
router.post(
  "/novedades",
  rateLimiter,
  jwtAuth,
  uploader.single("imagen"),
  novedades.create
);
router.put("/novedades", rateLimiter, jwtAuth, novedades.update);
router.put("/novedadesImage",rateLimiter,jwtAuth,uploader.single("imagen"),novedades.uploadImage)

router.delete("/novedades", rateLimiter, jwtAuth, novedades.remove);

/* router.post('/novedades/image', rateLimiter,imageUpload.single('image'), novedades.uploadImage); */

module.exports = router;
