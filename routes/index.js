module.exports = {
  initialize(server) {
    // core routes
    server.use('/auth', require('./auth.route'));
    server.use('/api', require('./users.route'));

   
    
    return true;
  }
};
