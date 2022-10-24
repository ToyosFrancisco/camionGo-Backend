module.exports = {
  auth: require('./auth.controller'),
  users: require('./users.controller'),

  novedades: require('./novedades.controller'),
  contacto: require('./contacto.controller'),
  destacados:require('./destacados.controller'),
  banners:require('./banners.controller'),

  configuraciones:require('./configuraciones.controller'),
  
  informacion:require('./informacion.controller'),
  nosotros:require('./nosotros.controller')
};