// modules
const mongoose = require("mongoose");

// callbacks/methods

// schema definition
const userSchema = new mongoose.Schema(
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
    
    

    // user info
    email: {
      user_email: String,
      tag:String,
    },

    personal_contact:[
      {
        tag:String,
        phone:String,
      }
    ],

    bussiness_contact:{
      type:String,
    },

    important_day:{
      tag:String,
      day:String
    },

    // personal info
    firstName: String,
    lastName: String,

  },
  {
    collection: "users",
  }
);



module.exports = mongoose.model("users", userSchema);
