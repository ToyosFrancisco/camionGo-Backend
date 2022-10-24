// modules
const mongoose = require('mongoose');

// schema definition
const nosotrosSchema = new mongoose.Schema({
  // system usage
  createdAt: {
    type: Date,
    default: new Date()
  },

  updatedAt: Date,
  creationMethod: String,

  deleted: {
    default: false,
    type: Boolean
  },

  // categorias info
  
  nombre:String,

  apellido:String,

  bio:String,

  imgSrc:String,

}, {
  collection: 'nosotros'
});

module.exports = mongoose.model('nosotros', nosotrosSchema);