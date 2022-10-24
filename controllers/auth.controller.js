// libs
const jwt = require("../lib/utils/jwt.util");

// services
// const {
//   admins
// } = require('../services');

module.exports = {
  async localAuth(req, res) {
    let token = null;
    let data = req.user;

    try {
      token = jwt.create(req.user);
    } catch (ex) {
      console.log("[POST /auth/login localAuth() ex] ", ex);
      return res.failure(-1, ex.message, 500);
    }
    return res.success(token, 200);
  },

  async localAdminAuth(req, res) {
    let token = null;
    let data = req.user;

    if(data.role === "user"){
      return res.failure(-1, 'Acceso denegado', 429);
    }
    
    try {
      token = jwt.create(data);
    } catch (ex) {
      console.log("[POST /auth/loginAdmin localAdminAuth() ex] ", ex);
      return res.failure(-1, ex.message, 500);
    }
    return res.success(token, 200);
  },

  // async register(req, res) {
  //   try {
  //     const newUser = await admins.create(req.body);

  //     return res.success(newUser, 200);
  //   } catch (ex) {
  //     console.log('[POST /auth/register register() ex] ', ex);
  //     return res.failure(-1, ex.message, 500);
  //   }
  // }
};
