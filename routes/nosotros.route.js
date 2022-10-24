// modules
const router = require("express").Router();

// controller
const { nosotros } = require("../controllers");

// middlewares
const { jwtAuth } = require("../lib/middlewares/auth.middleware");

const { rateLimiter } = require("../lib/middlewares/limiter.middleware");

const {
  imageUpload,
  uploader,
} = require("../lib/middlewares/multer.middleware");

// routing
router.get("/nosotros", rateLimiter, nosotros.get);
router.post(
  "/nosotros",
  rateLimiter,
  jwtAuth,
  uploader.single("imagen"),
  nosotros.create
);
router.put("/nosotros", rateLimiter, jwtAuth, nosotros.update);

router.put("/nosotrosImage", rateLimiter, jwtAuth,uploader.single("imagen"), nosotros.uploadImage);


router.delete("/nosotros", rateLimiter, jwtAuth, nosotros.remove);

/* router.post('/nosotros/image', rateLimiter,imageUpload.single('image'), nosotros.uploadImage); */

module.exports = router;