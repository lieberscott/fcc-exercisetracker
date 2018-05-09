let mongoose = require("mongoose");
let Exerciser = require("./newUser.js").ExerciserModel;

let addExercise = function(req, res) {
  let id = req.body.userId; // captures input field of form; "userId" here matches <input name="userId"> in index.html file
  let desc = req.body.description;
  let dur = req.body.duration;
  let date = req.body.date;
  
  findEditThenSave(id, desc, dur, date);
  
  
  let findEditThenSave = function(id, desc, dur, date, done) {
  
    Exerciser.findById(id, (err, data) => {
      if (err) {
        res.json({ Error: "ID not found" });
        done(err);
      }
      
      data.exercises.push({
        desc: desc,
        duration: dur,
        date: date
      });
      
      data.save((err, data) => {
        if (err) {
          res.json({ Error: "Data not saved. Please try again." });
          done(err);
        }
        else {
          res.json({ Response: "Exercise saved" });
          done(null, data)
        }
      });
    });
  };
};


//----------- Do not edit below this line -----------//

exports.addExercise = addExercise; // addExercise will be how it is imported in other documents such as server.js