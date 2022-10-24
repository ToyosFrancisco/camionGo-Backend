// Services
const { destacados } = require("../services");

/**
 * query destacados
 * @route GET /api/destacados
 */
exports.get = async (req, res) => {
  const { id } = req.query;

  // query destacados by id
  try {
    const recordset = await (async (id) => {
      if (!!id) {
        return await destacados.getById(id);
      }

      return await destacados.getAll();
    })(id);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[GET /api/destacados get()] ", ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * create new destacados
 * @route POST /api/destacados
 */
exports.create = async (req, res) => {
  try {
    const destacado = await destacados.create(req.body, req.file);
    return res.success(destacado, 200);
  } catch (ex) {
    console.log("[POST /api/destacados create()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * update destacados
 * @route PUT /api/destacados
 */
exports.update = async (req, res) => {
  const { id, ...data } = req.body;
  const imagen = req.file;

  try {
    const updateDestacados = await destacados.update(id, data, imagen );

    return res.success(updateDestacados, 200);
  } catch (ex) {
    console.log("[PUT /api/destacados update()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};
  
/**
 * soft delete destacados
 * @route DELETE /api/destacados
 */
exports.remove = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteDestacados = await destacados.remove(id);

    return res.success(deleteDestacados, 200);
  } catch (ex) {
    console.log("[PUT /api/destacados remove()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

exports.uploadImage = async (req, res) => {
  const { id = null } = req.body;

  try {
    const recordset = await destacados.uploadImage(id, req.file);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[POST /api/destacados/image uploadImage()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};
