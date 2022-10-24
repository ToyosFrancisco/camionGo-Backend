module.exports = {
    server: require('./server.loader'),
    database: require('./mongodb.loader'),
    errorHandler: require('./errorHandler.loader'),
    passport: require('./passport.loader')
  };