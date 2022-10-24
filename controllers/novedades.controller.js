// Services
const { novedades } = require("../services");

/**
 * query novedades
 * @route GET /api/novedades
 */
exports.get = async (req, res) => {
  const {
    id,
    limit = 0
  } = req.query;

  // query banner by id
  try {
    const recordset = await (async (id, limit) => {
      if (!!id) {
        return await novedades.getById(id);
      }

      return await novedades.getAll(limit);
    })(id, limit);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[GET /api/novedades get()] ", ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * create new banner
 * @route POST /api/novedades
 */
exports.create = async (req, res) => {
  try {
    const banner = await novedades.create(req.body, req.file);
    return res.success(banner, 200);
  } catch (ex) {
    console.log("[POST /api/novedades create()] ", ex.message);

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
    const updateImage = await novedades.uploadImage(id, image);

    return res.success(updateImage,200);
  } catch (ex) {
    console.log("[PUT /api/novedadesImage update()] ", ex.message);
    return res.failure(-1,ex.message,500)
  }
}


/**
 * update banner
 * @route PUT /api/novedades
 */
exports.update = async (req, res) => {
  const { id, ...data } = req.body;

  try {
    const updateNovedades = await novedades.update(id, data);

    return res.success(updateNovedades, 200);
  } catch (ex) {
    console.log("[PUT /api/novedades update()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * soft delete banner
 * @route DELETE /api/novedades
 */
exports.remove = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedNovedades = await novedades.remove(id);

    return res.success(deletedNovedades, 200);
  } catch (ex) {
    console.log("[PUT /api/novedades remove()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};


