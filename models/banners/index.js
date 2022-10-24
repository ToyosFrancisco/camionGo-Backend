// modules
const mongoose = require('mongoose');

// schema definition
const bannersSchema = new mongoose.Schema({
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

  // banners info

  title:String,

  description:String,

  imgSrc: String,

  ubicacion:String,
  
}, {
  collection: 'banners'
});

module.exports = mongoose.model('banners', bannersSchema);