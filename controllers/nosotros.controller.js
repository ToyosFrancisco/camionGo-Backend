// Services
const { nosotros } = require("../services");

/**
 * query nosotros
 * @route GET /api/nosotros
 */
exports.get = async (req, res) => {
  const { id, type } = req.query;

  // query nosotros by id
  try {
    const recordset = await (async (id, type) => {
      if (!!id) {
        return await nosotros.getById(id);
      }

      return await nosotros.getAll(type);
    })(id, type);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[GET /api/nosotros get()] ", ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * create new nosotros
 * @route POST /api/nosotros
 */
exports.create = async (req, res) => {


  try {
    const seccion = await nosotros.create(req.body, req.file);
    return res.success(seccion, 200);
  } catch (ex) {
    console.log("[POST /api/nosotros create()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * update nosotros
 * @route PUT /api/nosotros
 */
exports.update = async (req, res) => {
  const { id, ...data } = req.body;

  try {
    const updatenosotros = await nosotros.update(id, data);

    return res.success(updatenosotros, 200);
  } catch (ex) {
    console.log("[PUT /api/nosotros update()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * soft delete nosotros
 * @route DELETE /api/nosotros
 */
exports.remove = async (req, res) => {
  const { id } = req.body;

  try {
    const deletenosotros = await nosotros.remove(id);

    return res.success(deletenosotros, 200);
  } catch (ex) {
    console.log("[PUT /api/nosotros remove()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

exports.uploadImage = async (req, res) => {
  const { id = null } = req.body;

  try {
    const recordset = await nosotros.uploadImage(id, req.file);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[POST /api/nosotros/image uploadImage()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};