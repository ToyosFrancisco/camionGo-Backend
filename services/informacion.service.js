// modules
const AWS = require("aws-sdk");
const axios = require("axios");
const { Types } = require("mongoose");

// models
const { informacion } = require("../models");

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
 * @returns informacion object
 */
exports.getById = async (id = null, lean = true) => {
  if (!id) {
    throw new Error("unidentified banner");
  }

  try {
    return await informacion.findById(id).lean(lean).exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } lean
 * @returns informacion recordset
 */
exports.getAll = async (type = null, lean = true) => {
  try {
    const query = {
      deleted: false,
    };

    const sort = {
      createdAt: -1,
      _id:-1,
    };

    if (!!type) {
      query.destiny = type;
    }

    return await informacion.find(query).sort(sort).lean(lean).exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { Object } data
 * @returns new informacion
 */
exports.create = async (data = null) => {
  if (!data) {
    throw new Error("empty body");
  }

  try {
    return await new informacion({
      ...data,
      //imgSrc: `/imagenes/${ file.filename }`,
    }).save();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } data
 * @returns updated informacion fields
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
      ...data
    },
  };

  try {
    return await informacion.updateOne(query, update);
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
    return await informacion.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

exports.count = async () => {
  try {
    const query = {
      deleted: false,
    };

    return await informacion.count(query);
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

  const key = `informacion/${id}/${Types.ObjectId()}-${file.originalname}`;

  // create signed url to upload banner
  const preSignedUrl = await (async (Key, ContentType) => {
    const params = {
      Bucket: process.env.DO_AWS_BUCKET_NAME,
      Expires: 60 * 15,
      ACL: "public-read",
      ContentType,
      Key,
    };

    try {
      return await S3.getSignedUrlPromise("putObject", params);
    } catch (ex) {
      throw new Error(ex.message);
    }
  })(key, file.mimetype);

  // upload restaurant image
  try {
    await axios.put(preSignedUrl, file.buffer, {
      headers: {
        "Content-Type": file.mimetype,
        "x-amz-acl": "public-read",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (ex) {
    console.log("[error uploading banner image to s3] ", ex);

    throw new Error(ex.message);
  }

  // update image
  try {
    const query = {
      _id: id,
    };

    const update = {
      $set: {
        imgSrc: `https://${process.env.DO_AWS_BUCKET_NAME}.${process.env.DO_AWS_IMG_URL}/${key}`,
      },
    };

    return await informacion.updateOne(query, update);
  } catch (ex) {
    console.log("[error updating restaurant image]");

    throw new Error(ex.message);
  }
};
