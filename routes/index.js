module.exports = {
  initialize(server) {
    // core routes
    server.use('/auth', require('./auth.route'));
    server.use('/api', require('./users.route'));

    // app route
    server.use('/api', require('./novedades.route'));
    server.use('/api', require('./destacados.route'));
    server.use('/api', require('./contacto.route'));
    server.use('/api', require('./banners.route'));

    server.use('/api', require('./configuraciones.route'));
    
    server.use('/api',require('./informacion.route'));
    server.use('/api', require('./nosotros.route'))
    
    return true;
  }
};
