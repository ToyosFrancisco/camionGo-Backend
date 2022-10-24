// models
const sharp = require("sharp");
const fs = require("fs");
const { configuraciones } = require("../models");

/**
 * @param { String } id
 * @param { String } lean
 * @returns configuraciones object
 */

exports.getByField = async (lean = null) => {
  try {
    return await configuraciones
      .findOne({
        configGlobal: "MAIN_CONFIG",
      })
      .lean(lean)
      .exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { Object } data
 * @returns new configuraciones
 */
exports.create = async () => {
  const count = await configuraciones.countDocuments({
    configGlobal: "MAIN_CONFIG",
  });

  if (count === 0) {
    try {
      return await new configuraciones({
        configGlobal: "MAIN_CONFIG",
        general: {
          metaTag: "Waia Rosario",
          metaTitle: "Waia Rosario",
        },
        comercio: {
          nombreComercio: "Waia Tech",
          nombrePropietario: "Waia SRL",
          descripcion: "Asesoramiento | Juan Jose Paso 8540",
          bioFirma:
            "Con oficinas en Rosario, Argentina y un alcance internacional, brindamos servicios a empresas, pymes y profesionales de diferentes rubros. Complete el formulario de consulta, un asesor se pondra en contacto a la brevedad.",
          direccion: "Juan Jose Paso 8540",
          email: "hola@waia.ar",
          telefono: "3413070683",

          linkFb: "https://m.facebook.com/WAIA-110004734608364",
          userFb:"Waia Tech",

          linkIns: "https://instagram.com/waiatech?igshid=YmMyMTA2M2Y=",
          userIns:"waiatech",

          linkIn:"https://ar.linkedin.com/company/waiatech",
          userIn:"Waia",

          linkTwi:"https://mobile.twitter.com/haraldv_",
          userTw:"Waia"
        },
        email: {},
        logo: {
          imagenLogo:"/imagenes/W.png",
          imagenIcono:"/imagenes/W.png"
        },
        institucional: [],
        color: "#3f51b5",
        font: "Lato",
      }).save();
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  return null;
};

/**
 * @param { Object } data
 * @returns new institucional
 */
exports.createInstitucional = async (data = null, file = null) => {
  if (!data) {
    throw new Error("empty body");
  } else if (!file) {
    throw new Error("empty file");
  }

  try {
    const processImage = sharp(file.path);
    const resizeImage = processImage.resize(600, null, {
      fit: "contain",
      withoutEnlargement: true,
      background: "transparent",
    });
    const resizedImageBuffer = await resizeImage.toBuffer();

    await fs.writeFileSync(file.path, resizedImageBuffer);
  } catch (ex) {
    throw new Error(ex.message);
  }

  const query = {
    configGlobal: "MAIN_CONFIG",
  };

  const update = {
    $push: {
      institucional: {
        ...data,
        imgUrl: `/imagenes/${file.filename}`,
      },
    },
  };
  try {
    return await configuraciones.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } data
 * @returns updated configuraciones fields
 */
exports.update = async (data = null) => {
  if (!data) {
    throw new Error("empty body");
  }

  const query = {
    configGlobal: "MAIN_CONFIG",
  };

  const update = {
    $set: {
      general: {
        metaTag: data.metaTag,
        metaTitle: data.metaTitle,
      },

      comercio: {
        nombreComercio: data.nombreComercio,
        nombrePropietario: data.nombrePropietario,
        descripcion: data.descripcion,
        direccion: data.direccion,
        email: data.email,
        telefono: data.telefono,

        bioFirma:data.bioFirma,

        userFb:data.userFb,
        linkFb: data.linkFb,

        userIns:data.userIns,
        linkIns: data.linkIns,

        userIn:data.userIn,
        linkIn:data.linkIn,

        userTw:data.userTw,
        linkTw:data.linkTw,
      },

      email: {
        motor: data.motor,
        host: data.host,
        puerto: data.puerto,
        usuario: data.usuario,
        password: data.password,
      },

    },
  };
  try {
    return await configuraciones.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } files
 * @returns updated configuraciones fields
 */
exports.updateImage = async (files = null) => {
  if (!files) {
    throw new Error("empty files");
  }

  const logo = files.filter((elem) => elem.originalname === "logo");
  const ico = files.filter((elem) => elem.originalname === "ico");

  const fileLogo = logo.map(({ filename, path }) => {
    return {
      path,
      imagenLogo: `/imagenes/${filename}`,
    };
  });

  const objLogo = fileLogo.reduce(
    (acc, elem) => {
      acc.imagen = elem.imagenLogo;
      acc.path = elem.path;

      return acc;
    },
    { imagen: "", path: "" }
  );

  const fileIco = ico.map(({ filename, path }) => {
    return {
      path,
      imagenIcono: `/imagenes/${filename}`,
    };
  });
  const objIco = fileIco.reduce(
    (acc, elem) => {
      acc.imagen = elem.imagenIcono;
      acc.path = elem.path;

      return acc;
    },
    { imagen: "", path: "" }
  );

  try {
    const processImage = sharp(objIco.path);
    const resizeImage = processImage.resize(256, 256, {
      fit: "contain",
      withoutEnlargement: true,
      background: "transparent",
    });
    const resizedImageBuffer = await resizeImage.toBuffer();

    await fs.writeFileSync(objIco.path, resizedImageBuffer);
  } catch (ex) {
    throw new Error(ex.message);
  }

  const query = {
    configGlobal: "MAIN_CONFIG",
  };

  const update = {
    $set: {
      logo: {
        imagenLogo: objLogo.imagen,
        imagenIcono: objIco.imagen,
      },
    },
  };
  try {
    return await configuraciones.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } data
 * @returns updated color and font field
 */
exports.updateColorFont = async (data = null, config = {}) => {
  if (!data) {
    throw new Error("empty body");
  }

  const query = {
    configGlobal: "MAIN_CONFIG",
  };

  const update = {
    $set: {
      color: data.color,
      font: data.font,
    },
  };

  try {
    return await configuraciones.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } data
 * @returns updated unstitucional
 */
exports.updateInstitucion = async (id = null, data = null) => {
  if (!id) {
    throw new Error("unidentified banner");
  } else if (!data) {
    throw new Error("empty body");
  }

  const query = {
    configGlobal: "MAIN_CONFIG",
    institucional: {
      $elemMatch: {
        _id: id,
      },
    },
  };

  const update = {
    $set: {
      "institucional.$.titulo": data.titulo,
      "institucional.$.descripcion": data.descripcion,
    },
  };

  try {
    return await configuraciones.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } data
 * @returns updated unstitucional
 */
exports.updateInstitucionImage = async (id = null, file = null) => {
  if (!id) {
    throw new Error("unidentified banner");
  } else if (!file) {
    throw new Error("empty image");
  }

  try {
    const processImage = sharp(file.path);
    const resizeImage = processImage.resize(600, null, {
      fit: "contain",
      withoutEnlargement: true,
      background: "transparent",
    });
    const resizedImageBuffer = await resizeImage.toBuffer();

    await fs.writeFileSync(file.path, resizedImageBuffer);
  } catch (ex) {
    throw new Error(ex.message);
  }

  const query = {
    configGlobal: "MAIN_CONFIG",
    institucional: {
      $elemMatch: {
        _id: id,
      },
    },
  };

  const update = {
    $set: {
      "institucional.$.imgUrl": `/imagenes/${file.filename}`,
    },
  };

  try {
    return await configuraciones.updateOne(query, update);
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
    configGlobal: 'MAIN_CONFIG'
  };

  const update = {
    $pull: {
      institucional: {
          _id: id
      }
    }
  };

  try {
    return await configuraciones.updateOne(query, update);
  } catch (ex) {
    console.log(ex.message)
    throw new Error(ex.message);
  }
};
