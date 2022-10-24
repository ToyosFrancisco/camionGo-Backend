// modules
const AWS = require("aws-sdk");
const axios = require("axios");
const { Types } = require("mongoose");
const sharp = require("sharp");
const fs = require("fs");

// models
const { nosotros } = require("../models");

// aws s3 config
AWS.config.update({
  credentials: {
    accessKeyId: process.env.DO_AWS_PUB_KEY,
    secretAccessKey: process.env.DO_AWS_PRIV_KEY,
  },
});

const S3 = new AWS.S3({
  region: "us-east-2",
});

/**
 * @param { String } id
 * @param { String } lean
 * @returns nosotrosobject
 */
exports.getById = async (id = null, lean = true) => {
  if (!id) {
    throw new Error("unidentified banner");
  }

  try {
    return await nosotros.findById(id).lean(lean).exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } lean
 * @returns nosotrosrecordset
 */
exports.getAll = async (type = null, lean = true) => {
  try {
    const query = {
      deleted: false,
    };

    const sort = {
      createdAt: 1,
      _id: 1,
    };

    if (!!type) {
      query.destiny = type;
    }

    return await nosotros.find(query).sort(sort).lean(lean).exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { Object } data
 * @returns new nosotros
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
    return await new nosotros({
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
 * @returns updated nosotrosfields
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
    return await nosotros.updateOne(query, update);
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
    return await nosotros.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

exports.count = async () => {
  try {
    const query = {
      deleted: false,
    };

    return await nosotros.count(query);
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

    return await nosotros.updateOne(query, update);
  } catch (ex) {
    console.log("[error updating nosotros image]");

    throw new Error(ex.message);
  }
};
