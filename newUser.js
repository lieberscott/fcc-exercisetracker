'use strict';

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  long: {
    type: String,
    required: true
  },
  short: Number
});

let Url = mongoose.model("Url", UrlSchema);