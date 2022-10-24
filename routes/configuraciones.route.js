// modules
const router = require("express").Router();

// controller
const { configuraciones } = require("../controllers");

// middlewares
const { jwtAuth } = require("../lib/middlewares/auth.middleware");

const { rateLimiter } = require("../lib/middlewares/limiter.middleware");

const {
  imageUpload,
  uploader,
} = require("../lib/middlewares/multer.middleware");

// routing
router.get("/configuraciones", rateLimiter, configuraciones.get);
// router.post(
//   "/configuraciones",
//   rateLimiter,
//   jwtAuth,
//   uploader.single("imagen"),
//   configuraciones.create
// );
router.put(
  "/configuraciones",
  rateLimiter,
  jwtAuth,
  configuraciones.update
);

router.put(
  "/configuracionesImage",
  rateLimiter,
  jwtAuth,
  uploader.array("imagenes",2),
  configuraciones.updateImage
);

router.put(
  "/configuracionesColorFont",
  rateLimiter,
  jwtAuth,
  configuraciones.updateColorFont
);


router.put(
  "/configuracionesInstitucional",
  rateLimiter,
  jwtAuth,
  uploader.single("imagen"),
  configuraciones.createInstitucional
)


router.put(
  "/configuracionInstitucionalCont",
  rateLimiter,
  jwtAuth,
  configuraciones.updateInstitucional
);


router.put(
  "/configuracionInstitucionalImage",
  rateLimiter,
  jwtAuth,
  uploader.single("imagen"),
  configuraciones.updateInstitucionalImage
)

router.delete("/institucional", rateLimiter, jwtAuth, configuraciones.remove);


module.exports = router;