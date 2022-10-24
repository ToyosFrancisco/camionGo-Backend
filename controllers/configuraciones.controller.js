// Services
const { configuraciones } = require("../services");

/**
 * query configuraciones
 * @route GET /api/configuraciones
 */
exports.get = async (req, res) => {
  const { id, configGlobal } = req.query;

  // query banner by id
  try {
    const recordset = await (async (id, configGlobal) => {
      if (!!id) {
        return await configuraciones.getById(id);
      }

      if (!!configGlobal) {
        return await configuraciones.getByField({
          configGlobal,
        });
      }
    })(id, configGlobal);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[GET /api/configuraciones get()] ", ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * create new banner
 * @route POST /api/configuraciones
 */
exports.create = async (req, res) => {
  try {
    const config = await configuraciones.create(req.body, req.file);
    return res.success(config, 200);
  } catch (ex) {
    console.log("[POST /api/configuraciones create()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * update config
 * @route PUT /api/configuraciones
 */
exports.update = async (req, res) => {
  const data = req.body;

  try {
    const updateconfiguraciones = await configuraciones.update(data);

    return res.success(updateconfiguraciones, 200);
  } catch (ex) {
    console.log("[PUT /api/configuraciones update()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};
/**
 * update config
 * @route PUT /api/configuraciones
 */
exports.updateImage = async (req,res) => {
  const images = req.files;
  try{
    const updateImage = await configuraciones.updateImage(images);
    return res.success(updateImage,200);
  }catch(ex){
    console.log("[PUT /api/configuraciones updateImage()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
}


/**
 * update color
 * @route PUT /api/configuraciones
 */
exports.updateColorFont = async (req, res) => {
  const data = req.body;

  try {
    const updateColorFont = await configuraciones.updateColorFont(data);

    return res.success(updateColorFont, 200);
  } catch (ex) {
    console.log("[PUT /api/configuraciones updateColorFont()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * create new institucional
 * @route POST /api/configuraciones
 */
exports.createInstitucional = async (req, res) => {
  const data = req.body;
  const imagen = req.file;
  try {
    const config = await configuraciones.createInstitucional(
      data,
      imagen
    );
    return res.success(config, 200);
  } catch (ex) {
    console.log(
      "[POST /api/configuraciones createInstitucional()] ",
      ex.message
    );

    return res.failure(-1, ex.message, 500);
  }
};

exports.updateInstitucional = async (req, res) => {
  const { id, ...data } = req.body;
  try {
    const updateInstitucional = await configuraciones.updateInstitucion(
      id,
      data
    );
    return res.success(updateInstitucional, 200);
  } catch (ex) {
    console.log(
      "[PUT /api/configuraciones updateInstitucional()] ",
      ex.message
    );
    return res.failure(-1, ex.message, 500);
  }
};
exports.updateInstitucionalImage = async (req, res) => {
  const { id } = req.body;
  const image = req.file;
  try {
    const updateInstitucionalImage = await configuraciones.updateInstitucionImage(
      id,
      image
    );
    return res.success(updateInstitucionalImage, 200);
  } catch (ex) {
    console.log(
      "[PUT /api/configuraciones updateInstitucionalImage()] ",
      ex.message
    );
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * soft delete banner
 * @route DELETE /api/configuraciones
 */
exports.remove = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteInstitucional = await configuraciones.remove(id);

    return res.success(deleteInstitucional, 200);
  } catch (ex) {
    console.log("[PUT /api/configuraciones remove()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

exports.uploadImage = async (req, res) => {
  const { id = null } = req.body;

  try {
    const recordset = await configuraciones.uploadImage(id, req.file);

    return res.success(recordset, 200);
  } catch (ex) {
    console.log("[POST /api/configuraciones/image uploadImage()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};

/**
 * soft delete nosotros
 * @route DELETE /api/institucional
 */
exports.remove = async (req, res) => {
  const { id } = req.body;

  console.log(id);

  try {
    const deleteInstitucional = await configuraciones.remove(id);

    return res.success(deleteInstitucional, 200);
  } catch (ex) {
    console.log("[PUT /api/institucional remove()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};