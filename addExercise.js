let mongoose = require("mongoose");
let Exerciser = require("./newUser.js").ExerciserModel;

let addExercise = function(req, res) {
  let id = req.body.userId; // captures input field of form; "userId" here matches <input name="userId"> in index.html file
  let desc = req.body.description || "No Description given";
  let dur = req.body.duration || 0;
  let arrdate;
  let year;
  let month;
  let day;
  let date;
  if (req.body.date) {
    arrdate = req.body.date.split("-");
    year = parseInt(arrdate[0]);
    month = parseInt(arrdate[1]) - 1;
    day = parseInt(arrdate[2]);
    date = new Date(year, month, day);
  }
  else {
    date = new Date();
  }
  let findEditThenSave = function(id, desc, dur, date, done) {
  
    Exerciser.findById(id, (err, data) => {
      if (err) {
        res.json({ Error: "ID not found" });
        done(err);
      }
      
      console.log(data);
      
      data.exercises.push({
        desc: desc,
        duration: dur,
        date: date
      });
      
      data.save((err, data) => {
        if (err) {
          console.log(err);
          res.json({ Error: "Data not saved. Please try again." });
          // done(err);
        }
        else {
          res.json({ Response: "Exercise saved" });
          // done(null, data)
        }
      });
    });
  };
  
  findEditThenSave(id, desc, dur, date);

};


//----------- Do not edit below this line -----------//

exports.addExercise = addExercise; // addExercise will be how it is imported in other documents such as server.js
