// Services
const { informacion } = require("../services");

/**
 * query informacion
 * @route GET /api/informacion
 */
exports.get = async (req, res) => {
  const { id, type } = req.query;

  // query banner by id
  try {
    const recordset = await (async (id, type) => {
      if (!!id) {
        return await informacion.getById(id);
      }

      return await informacion.getAll(type);
    })(id, type);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[GET /api/informacion get()] ", ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * create new banner
 * @route POST /api/informacion
 */
exports.create = async (req, res) => {
  try {
    const staff = await informacion.create(req.body);
    return res.success(staff, 200);
  } catch (ex) {
    console.log("[POST /api/informacion create()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * update banner
 * @route PUT /api/informacion
 */
exports.update = async (req, res) => {
  const { id, ...data } = req.body;

  try {
    const updateinformacion = await informacion.update(id, data);

    return res.success(updateinformacion, 200);
  } catch (ex) {
    console.log("[PUT /api/informacion update()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * soft delete banner
 * @route DELETE /api/informacion
 */
exports.remove = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedinformacion = await informacion.remove(id);

    return res.success(deletedinformacion, 200);
  } catch (ex) {
    console.log("[PUT /api/informacion remove()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

exports.uploadImage = async (req, res) => {
  const { id = null } = req.body;

  try {
    const recordset = await informacion.uploadImage(id, req.file);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[POST /api/informacion/image uploadImage()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};
