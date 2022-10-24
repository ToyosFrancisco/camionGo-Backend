

// models
const { banners } = require("../models");


/**
 * @param { String } id
 * @param { String } lean
 * @returns banners object
 */
exports.getById = async (id = null, lean = true) => {
  if (!id) {
    throw new Error("unidentified banner");
  }

  try {
    return await banners.findById(id).lean(lean).exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } lean
 * @returns banners recordset
 */
exports.getAll = async (type = [], lean = true) => {
  try {
    const query = {
      deleted: false,
    };

    const sort = {
      createdAt: -1,
      _id: -1,
      ubicacion: -1
    };

    if (!!type.length) {
      query.ubicacion = {
        $in: type
      };
    }

    return await banners
      .find(query)
      .sort(sort)
      .lean(lean)
      .exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { Object } data
 * @returns new banners
 */
exports.create = async (data = null, file = null) => {
  if (!data) {
    throw new Error("empty body");
  } else if (!file) {
    throw new Error("empty file");
  }

  try {
    return await new banners({
      ...data,
      imgSrc: `/imagenes/${file.filename}`,
    }).save();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } data
 * @returns updated banners fields
 */
exports.update = async (id = null, data = null) => {
  if (!id) {
    throw new Error("unidentified banner");
  } else if (!data) {
    throw new Error("empty body");
  }

  const query = {
    _id: id,
  };

  const update = {
    $set: {
      ...data,
    },
  };

  try {
    return await banners.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } file
 * @returns object
 */
exports.uploadImage = async (id = null, file = null) => {
  if (!id) {
    throw new Error("unidentified banner");
  } else if (!file) {
    throw new Error("empty file");
  }

  // update image
  try {
    const query = {
      _id: id,
    };

    const update = {
      $set: {
        imgSrc: `/imagenes/${file.filename}`,
      },
    };

    return await banners.updateOne(query, update);
  } catch (ex) {
    console.log("[error updating banner image]");

    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @returns boolean
 */
exports.remove = async (id = null) => {
  if (!id) {
    throw new Error("unidentified banner");
  }

  const query = {
    _id: id,
  };

  const update = {
    $set: {
      deleted: true,
    },
  };

  try {
    return await banners.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

exports.count = async () => {
  try {
    const query = {
      deleted: false,
    };

    return await banners.count(query);
  } catch (ex) {
    throw new Error(ex.message);
  }
};
