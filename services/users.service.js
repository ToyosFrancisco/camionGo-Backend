// modules
const {
  hash,
  genSaltSync,
  compareSync
} = require('bcryptjs');

// models
const { users } = require('../models');

/**
 * @param { String } id
 * @param { String } lean
 * @returns user object
 */
 exports.getById = async (id, lean = true) => {
  try {
    return await users
      .findById(id)
      .lean(lean)
      .exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } body
 * @returns user object
 */
exports.update = async (
  id = null,
  body = null
) => {
  if (!id) {
    throw new Error('unidentified user');
  } else if (!body) {
    throw new Error('empty body');
  }
  console.log(body)
  const query = {
    _id: id
  };

  const update = {
    $set: {
      ...body
    }
  };

  try {
    return await users.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } body
 * @returns user object
 */
exports.updateByField = async (
  query = null,
  body = null,
) => {
  /* if (!id) {
    throw new Error('unidentified user');
  } else if (!body) {
    throw new Error('empty body');
  } */

  /* const query = {
    _id: id
  };
 */
  const update = {
    $set: {
      ...body
    }
  };

  try {
    return await users.updateOne(query, update);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { Object } query
 * @param { String } lean
 * @returns user object
 */
exports.getByField = async (
  query = {},
  lean = true
) => {
  try {
    return await users
      .findOne(query)
      .lean(lean)
      .exec();
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { Object } data
 * @returns updated user profile
 */
exports.editProfile = async (
  id = null,
  data = null
) => {

  console.log(data,'data')

  if (!id) {
    throw new Error('unidentified user');
  } else if (!data) {
    throw new Error('empty body');
  }

  const query = {
    _id: id
  };

  const update = {
    $push: {
      personal_contact:[
        {
          tag:data.personal_contact.tag,
          phone:data.personal_contact.phone,
        }
      ],
    }
  };

  const extra = {
    safe: true,
    new: true
  };

  try {
    return await users.findOneAndUpdate(query, update, extra);
  } catch (ex) {
    throw new Error(ex.message);
  }
};

/**
 * @param { String } id
 * @param { String } oldPassword
 * @param { String } newPassword
 * @returns boolean
 */
exports.updatePassword = async (
  id = null,
  oldPassword = null,
  newPassword = null
) => {
  if (!id) {
    throw new Error('unidentified user');
  } else if(!oldPassword || !newPassword) {
    throw new Error('error in password');
  }

  // query user
  const user = await users
    .findById(id)
    .exec();

  if (!user) {
    throw new Error('user not found');
  } else if (!compareSync(oldPassword, user.password)) {
    throw new Error('incorrect password');
  }

  try {
    const query = { _id: id };

    const update = {
      $set: {
        updatedAt: new Date(),
        password: await hash(newPassword, genSaltSync(10), null),
      }
    };

    await users.updateOne(query, update);

    // const options = {
    //   caller: 'UPDATE_HOOK'
    // };

    // user.password = newPassword;

    // await user.save(options);
  } catch (ex) {
    throw new Error(ex.message);
  }

  return true;
};

exports.count = async() => {
  try {
    const query = {
      deleted: false
    };

    return await users.count(query);
  } catch (ex) {
    throw new Error(ex.message);
  };
};