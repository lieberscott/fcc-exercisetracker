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
      default: new Date()
    }
  }]
});

let User = mongoose.model("User", UserSchema);


let createShort = function(req, res) {
  let newuser = req.body.username; // captures input field of form; "username" here matches <input name="username"> in index.html file
  
  checkRepeat(newuser)
  
  async function checkRepeat(username) { // check if url is already in database
    let check = await User.findOne({username: username});

    if (check) { // username already exists
      res.json({
        Error: "Username already in use. Please select another."
      });
    }
    
    else { // doesn't exist, so trigger addUser function
      addUser(username);
    }
  };
  
  async function addUser(username) {
    let newentry = new User({
        username: username
      });
      
     newentry.save((err, data) => {
      if (err) { console.log(err) }
      else { console.log(data) }
    });
      
    res.json(newentry);
  }

};