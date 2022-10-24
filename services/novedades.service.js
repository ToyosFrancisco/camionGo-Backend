// modules
const sharp = require("sharp");
const fs = require('fs')

// models
const { novedades } = require("../models");



/**
 * @param { String } id
 * @param { String } lean
 * @returns novedades object
 */
exports.getById = async (id = null, lean = true) => {
  if (!id) {
    throw new Error("unidentified banner");
  }

  try {
    return await novedades.findById(id).lean(lean).exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { Number } limit
 * @returns novedades recordset
 */
exports.getAll = async (limit = 0, lean = true) => {
  try {
    const query = {
      deleted: false,
    };

    const sort = {
      _id: -1
    };

    return await novedades
      .find(query)
      .limit(parseInt(limit))
      .sort(sort)
      .lean(lean)
      .exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { Object } data
 * @returns new novedades
 */
exports.create = async (data = null, file = null) => {
  if (!data) {
    throw new Error("empty body");
  } else if (!file) {
    throw new Error("empty file");
  }


  try {
    const processImage = sharp(file.path);
    const resizeImage = processImage.resize(400, null, {
      fit: "contain",
      withoutEnlargement:true,
      background:'transparent'
    });
    const resizedImageBuffer = await resizeImage.toBuffer();

    await fs.writeFileSync(file.path, resizedImageBuffer);
  } catch (ex) {
    throw new Error(ex.message);
  }


  try {
    return await new novedades({
      ...data,
      imgSrc: `/imagenes/${ file.filename }`,
    }).save();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } data
 * @returns updated novedades fields
 */
exports.update = async (id = null, data = null) => {
 

  const query = {
    _id: id,
  };

  const update = {
    $set: {
      ...data
    },
  };

  try {
    return await novedades.updateOne(query, update);
  } catch (ex) {
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
    return await novedades.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

exports.count = async () => {
  try {
    const query = {
      deleted: false,
    };

    return await novedades.count(query);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

exports.uploadImage = async (id = null, file = null) => {
  if (!id) {
    throw new Error("unidentified banner");
  } else if (!file) {
    throw new Error("empty file");
  }


  try {
    const processImage = sharp(file.path);
    const resizeImage = processImage.resize(400, null, {
      fit: "contain",
      withoutEnlargement:true,
      background:'transparent'
    });
    const resizedImageBuffer = await resizeImage.toBuffer();

    await fs.writeFileSync(file.path, resizedImageBuffer);
  } catch (ex) {
    throw new Error(ex.message);
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

    return await novedades.updateOne(query, update);
  } catch (ex) {
    console.log("[error updating novedades image]");

    throw new Error(ex.message);
  }
};
