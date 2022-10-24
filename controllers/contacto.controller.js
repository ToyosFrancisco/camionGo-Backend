// services
const { contacto } = require("../services");
const { configuraciones } = require("../services")
/**
 * query contacto
 * @route GET /api/contacto
 */
exports.get = async (req, res) => {
  const { id, ...query } = req.query;

  // console.log('{ req.query } ', req.query);

  // query restaurant by id
  try {
    const recordset = await (async (id, query) => {
      if (!!id) {
        return await contacto.getById(id);
      }

      return await contacto.getAll(query);
    })(id, query);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[GET /api/contacto get()] ", ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * send email
 * @route POST /api/contacto
 */
exports.send = async (req, res) => {
  try {
    const configData = await configuraciones.getByField();
    const email = await contacto.send(req.body, configData);

    return res.success(email, 200);
  } catch (ex) {
    console.log("[POST /api/contacto create()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * update restaurant
 * @route PUT /api/contacto
 */
exports.update = async (req, res) => {
  const { id, ...data } = req.body;

  try {
    const updatecontacto = await contacto.update(id, data);

    return res.success(updatecontacto, 200);
  } catch (ex) {
    console.log("[PUT /api/contacto update()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * soft delete restaurant
 * @route DELETE /api/contacto
 */
exports.remove = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedcontacto = await contacto.remove(id);

    return res.success(deletedcontacto, 200);
  } catch (ex) {
    console.log("[PUT /api/contacto remove()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * import contacto from xlsx
 * @route POST /api/contacto/import
 */
exports.massiveImport = async (req, res) => {
  const { destination, filename } = req.file;

  // process excel
  const recordset = await (async (path) => {
    try {
      return await contacto.processExcel(path);
    } catch (ex) {
      throw new Error(ex.message);
    }
  })(`${destination}/${filename}`);

  // asign hotels to contacto
  const recordsetWithHotels = await (async (recordset) => {
    try {
      return await contacto.asignHotels(recordset);
    } catch (ex) {
      throw new Error(ex.message);
    }
  })(recordset);

  // save documents
  const documents = await (async (recordset) => {
    try {
      return await contacto.createMulti(recordset);
    } catch (ex) {
      throw new Error(ex.message);
    }
  })(recordsetWithHotels);

  return res.success(documents, 200);
};

exports.uploadImage = async (req, res) => {
  const { id = null } = req.body;

  try {
    const recordset = await contacto.uploadImage(id, req.file);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[POST /api/contacto/image uploadImage()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

exports.search = async (req, res) => {
  try {
    const recordset = await contacto.search(req.query);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[GET /api/search/contacto search()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};
