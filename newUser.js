'use strict';

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ExerciserSchema = new Schema({
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

let Exerciser = mongoose.model("Exerciser", ExerciserSchema);


let createExerciser = function(req, res) {
  let newexerciser = req.body.username; // captures input field of form; "username" here matches <input name="username"> in index.html file
  
  checkRepeat(newexerciser);
  
  async function checkRepeat(exerciser) { // check if exerciser is already in database
    let check = await Exerciser.findOne({username: exerciser});

    if (check) { // username already exists
      res.json({
        Error: "Username already in use. Please select another."
      });
    }
    
    else { // doesn't exist, so trigger addUser function
      addExerciser(exerciser);
    }
  };
  
  function addExerciser(username) {
    let newentry = new Exerciser({
        username: username
      });
      
     newentry.save((err, data) => {
      if (err) { console.log(err) }
      else { console.log(data) }
    });
      
    res.json(newentry);
  }

};


//----------- Do not edit below this line -----------//

exports.ExerciserModel = Exerciser; // UserModel will be how it is imported in other documents such as redirectAction.js
exports.createExerciser = createExerciser;