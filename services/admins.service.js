// models
const { users } = require("../models");

/**
 * @param { String } lean
 * @returns users recordset
 */
exports.getAllUsers = async (lean = true) => {
  try {
    const query = {
      deleted: false,
    };

    return await users.find(query).lean(lean).exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } password
 * @param { Object } data
 * @returns new user
 */
exports.create = async (data = null) => {
  if (!data) {
    throw new Error("empty body");
  }

  try {
    const options = {
      caller: "CREATE_HOOK",
    };

    return await new users(data).save(options);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } password
 * @param { Object } data
 * @returns new user
 */
exports.createSuperAdmin = async () => {
  const count = await users.countDocuments({
    userFlag: "MAIN_USER",
  });

  if (count === 0) {
    try {
      return await new users({
        userFlag: "MAIN_USER",
        firstName: "Admin",
        lastName: "Admin",
        email: "hola@waia.ar",
        password: "juanJosePaso8540",
        role: "superAdmin",
        dni: "854005",
      }).save();
    } catch (ex) {
      throw new Error(ex.message);
    }
  }
  return null;
};

/**
 * @param { String } password
 * @param { Object } data
 * @returns new user
 */
exports.createNewPass = async (token = null, password = null) => {
  if (!token) {
    return true;
  }

  try {
    return await users.updateOne(
      {
        tokenRecoveryPass: token,
      },
      {
        password,
      },
      {
        caller: "UPDATE_HOOK",
      }
    );
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @returns boolean
 */
exports.deleteUser = async (id = null) => {
  if (!id) {
    throw new Error("unidentified user");
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
    await users.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }

  return true;
};
