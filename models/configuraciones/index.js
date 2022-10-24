// modules
const mongoose = require("mongoose");

// schema definition
const configuracionesSchema = new mongoose.Schema(
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

    // configuraciones info

    configGlobal: String,

    general: {
      metaTag: String,
      metaTitle: String,
    },

    comercio: {
      nombreComercio: String,
      nombrePropietario: String,
      descripcion: String,
      bioFirma:String,
      direccion: String,
      email: String,
      telefono: String,

      linkFb:String,
      userFb:String,

      linkIns:String,
      userIns:String,

      linkIn:String,
      userIn:String,

      userTw:String,
      linkTw:String,
    },

    email: {
      motor: String,
      host: String,
      puerto: String,
      usuario: String,
      password: String,
    },

    logo: {
      imagenLogo:{
        type:String,
        default:'/imagenes/W.png'
      },
      imagenIcono: {
        type:String,
        default:'/imagenes/W.png'
      }
    },

    /* institucional: {
      tituloPrimario: String,
      descripcionPrimario: String,

      tituloSecundario: String,
      descripcionSecundario: String,

      tituloTerciario: String,
      descripcionTerciario: String,
    }, */

    institucional : [{
      titulo:String,
      descripcion:String,
      imgUrl:String
    }],

    color:String,

    font:String,
  },
  {
    collection: "configuraciones",
    minimize: false,
  }
);

module.exports = mongoose.model("configuraciones", configuracionesSchema);
