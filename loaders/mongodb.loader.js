// modules
const mongoose = require("mongoose");

// service
const cfu = require("../services/admins.service")

module.exports = {
  // connect database
  async start() {
    const {
      // node enviroment
      NODE_ENV,
      // mongo development
      MONGO_URI_DEVELOPMENT,
      // mongo production
      DB_PRODUCTION_USER,
      DB_PRODUCTION_PASS,
      DB_PRODUCTION_HOST,
      DB_PRODUCTION_NAMESPACE,
      DB_PRODUCTION_DATABASE,
      CERT_PATH,
    } = process.env;

    const isProduction = NODE_ENV === "production";
    let CONNECTION_STRING = MONGO_URI_DEVELOPMENT;

    if (isProduction) {
      CONNECTION_STRING = `mongodb+srv://${DB_PRODUCTION_USER}:${DB_PRODUCTION_PASS}@${DB_PRODUCTION_HOST}/${DB_PRODUCTION_DATABASE}?authSource=admin&replicaSet=${DB_PRODUCTION_NAMESPACE}&tls=true&tlsCAFile=${CERT_PATH}`;
    }

    try {
      await mongoose.connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
        heartbeatFrequencyMS: 1000
      });
    } catch (ex) {
      console.log(`[-] mongodb exception ${ex.message}`);
      return process.exit(1);
    }

    return console.log(
      `[+] connected to mongodb - database: ${
        isProduction ? DB_PRODUCTION_HOST : MONGO_URI_DEVELOPMENT
      }`
    );
  },

  
};
