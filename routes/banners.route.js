// modules
const router = require("express").Router();

// controller
const { banners } = require("../controllers");

// middlewares
const { jwtAuth } = require("../lib/middlewares/auth.middleware");

const { rateLimiter } = require("../lib/middlewares/limiter.middleware");

const {
  imageUpload,
  uploader,
} = require("../lib/middlewares/multer.middleware");

// routing
router.get("/banners", rateLimiter, banners.get);
router.post(
  "/banners",
  rateLimiter,
  jwtAuth,
  uploader.single("imagen"),
  banners.create
);
router.put("/banners", rateLimiter, jwtAuth, banners.update);
router.put("/bannersImage", rateLimiter,jwtAuth, uploader.single("imagen"),banners.uploadImage)

router.delete("/banners", rateLimiter, jwtAuth, banners.remove);

/* router.post('/banners/image', rateLimiter,imageUpload.single('image'), banners.uploadImage); */

module.exports = router;
