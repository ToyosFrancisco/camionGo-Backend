// modules
const mongoose = require("mongoose");

// schema definition
const destacadosSchema = new mongoose.Schema(
  {
    // system usage
    createdAt: {
      type: Date,
      default: new Date(),
    },

    updatedAt: Date,
    creationMethod: String,

    deleted: {
      default: false,
      type: Boolean,
    },

    // destacados info

    descripcion: String,

    titulo: String,

    imgSrc: String,
  },
  {
    collection: "destacados",
  }
);

module.exports = mongoose.model("destacados", destacadosSchema);
