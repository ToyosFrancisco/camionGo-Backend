// services
const {
  users,
  admins,
  recoveryPass,
  configuraciones,
  
} = require('../services');

const {
  v4: uuidv4,
  validate: uuidValidate
} = require('uuid');


/**
 * query users
 * @route GET /api/users
 */
exports.getUsers = async (req, res) => {
  const { id } = req.query;

  // query user by id
  if (!!id) {
    try {
      const user = await users.getById(id);
      return res.success(user, 200);
    } catch (ex) {
      console.log('[GET /api/users getUsers() 1] ', ex.message);
      return res.failure(-1, ex.message, 500);
    }
  }

  // query all users
  try {
    const all = await admins.getAllUsers();
    return res.success(all, 200);
  } catch (ex) {
    console.log('[GET /api/users getUsers() 2] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * create user
 * @route POST /api/users
 */
exports.createUser = async (req, res) => {
  try {
    const user = await admins.create(req.body);
    return res.success(user, 200);
  } catch (ex) {
    console.log('[POST /api/users createUser()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * update password
 * @route PUT /api/users
 */
exports.createNewPass = async (req, res) => {
  const { token , password} = req.body
  console.log(token,'token');

  if(!token || !uuidValidate(token)){
    return res.failure(-1,'token expirado',500);
  }

  try {
    await admins.createNewPass(token, password);
  } catch (ex) {
    console.log('[POST /api/users createUser()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
  
  try {
    await users.updateByField({
      tokenRecoveryPass:token
    },{
      tokenRecoveryPass:null
    })
  } catch (ex) {
    return res.failure(-1,ex.message,500)
  }
  return res.success(true, 200);

};




/**
 * delete user
 * @route DELETE /api/users
 */
exports.deleteUser = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.failure(-1, 'Usuario no identificado', 400);
  }

  try {
    const user = await admins.deleteUser(id);
    return res.success(user, 200);
  } catch (ex) {
    console.log('[DELETE /api/users deleteUser()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

exports.editUser = async (req, res) => {
  const {
    id,
    ...body
  } = req.body;

  if (!id) {
    return res.failure(-1, 'Usuario no identificado', 400);
  }

  try {
    const user = await users.update(id, body);

    return res.success(user, 200);
  } catch (ex) {
    console.log('[PUT /api/users editUser()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
}

/**
 * get own profile info
 * @route GET /api/me/profile
 */
 exports.getProfile = async (req, res) => {
  const { sub } = req.user;

  try {
    const user = await users.getById(sub);
    return res.success(user, 200);
  } catch (ex) {
    console.log('[GET /api/me/profile] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
}

/**
 * user update own profile
 * @route PUT /api/me/profile
 */
exports.updateProfile = async (req, res) => {
  const { id } = req.query

  try {
    const user = await users.editProfile(id, req.body);
    return res.success(user, 200);
  } catch (ex) {
    console.log('[PUT /api/me/profile updateProfile()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * user updates own password
 * @route PUT /api/me/password
 */
exports.updatePassword = async (req, res) => {
  const { sub } = req.user;
  console.log(req.body,"req")

  try {
    const success = await users.updatePassword(sub, req.body.oldPassword, req.body.newPassword);
    return res.success(success, 200);
  } catch (ex) {
    console.log('[PUT /api/me/password updatePassword()] ', ex.message);
    return res.failure(-1, ex.message, 500);
  }
};

/**
 * send email
 * @route POST /api/recoveryPass
 */
exports.sendEmail = async (req, res) => {

  const { token , email} = req.body

  console.log(token,'token');

  try {
    const updateUser = await users.updateByField({
      email,
    },{tokenRecoveryPass:token});
    const configData = await configuraciones.getByField();
    const emailSending = await recoveryPass.sendEmail(token , email ,configData);

    return res.success(emailSending, 200);
  } catch (ex) {
    console.log("[POST /api/recoveryPass send()] ", ex.message);

    return res.failure(-1, ex.message, 500);
  }
};