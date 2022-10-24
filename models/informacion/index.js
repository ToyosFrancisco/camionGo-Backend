// modules
const mongoose = require('mongoose');

// schema definition
const informaciónSchema = new mongoose.Schema({
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

  // informacion info

  contenido:String,

  
}, {
  collection: 'informacion'
});

module.exports = mongoose.model('informacion', informaciónSchema);