'use strict';

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  exercises: [{
    desc: String,
    duration: Number,
    date: {
      type: Date,
      default: Date.now()
    }
  }]
});

let User = mongoose.model("User", UserSchema);