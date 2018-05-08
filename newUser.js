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
    
    else { // doesn't exist, so trigger addUrl function
      addUser(username);
    }
  };
  
  async function addUser(url) {
    let len = await User.findOne().sort({ short: -1 }).limit(1).exec() // gets most recent entry using short field
    let newshort;
    
    if (len == null) { // first entry in database
      newshort = new User({
        long: url,
        short: 1
      });
    }
    
    else {
      newshort = new User({
        long: url,
        short: len.short + 1
      });
    }
      
    newshort.save((err, data) => {
      if (err) { console.log(err) }
      else { console.log(data) }
    });
      
    res.json(newshort);
  }

};
