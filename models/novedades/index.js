// modules
const mongoose = require('mongoose');

// schema definition
const novedadesSchema = new mongoose.Schema({
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

  // novedades info

  title:String,

  description:String,

  imgSrc: String,
  
}, {
  collection: 'novedades'
});

module.exports = mongoose.model('novedades', novedadesSchema);