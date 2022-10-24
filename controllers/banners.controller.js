// Services
const { banners } = require("../services");

/**
 * query banners
 * @route GET /api/banners
 */
exports.get = async (req, res) => {
  const { id, type } = req.query;

  // query banner by id
  try {
    const recordset = await (async (id, type) => {
      if (!!id) {
        return await banners.getById(id);
      }

      return await banners.getAll(type);
    })(id, type);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[GET /api/banners get()] ", ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * create new banner
 * @route POST /api/banners
 */
exports.create = async (req, res) => {
  try {
    const banner = await banners.create(req.body, req.file);
    return res.success(banner, 200);
  } catch (ex) {
    console.log("[POST /api/banners create()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * update banner
 * @route PUT /api/banners
 */
exports.update = async (req, res) => {
  const { id, ...data } = req.body;

  try {
    const updatebanners = await banners.update(id, data);

    return res.success(updatebanners, 200);
  } catch (ex) {
    console.log("[PUT /api/banners update()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * update banner image
 * @route PUT /api/bannersImage
*/
exports.uploadImage = async (req,res) => {
  const { id } = req.body
  const image = req.file


  try {
    const updateImage = await banners.uploadImage(id, image);

    return res.success(updateImage,200);
  } catch (ex) {
    console.log("[PUT /api/bannersImage update()] ", ex.message);
    return res.failure(-1,ex.message,500)
  }
}


/**
 * soft delete banner
 * @route DELETE /api/banners
 */
exports.remove = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedbanners = await banners.remove(id);

    return res.success(deletedbanners, 200);
  } catch (ex) {
    console.log("[PUT /api/banners remove()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};


