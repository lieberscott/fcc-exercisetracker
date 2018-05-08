let mongoose = require("mongoose");
let User = require("./newUser.js").UserModel;

let addExercise = function(req, res) {
  let id = req.body.userId; // captures input field of form; "userId" here matches <input name="userId"> in index.html file
  let desc = req.body.description;
  let dur = req.body.duration;
  let date = req.body.date;
  
  
  let findEditThenSave = function(id, desc, dur, date, done) {
  
  User.findById(id, (err, data) => {
    if (err) { done(err) }
    data.exercise.push(foodToAdd);
    data.save((err, data) => {
      if (err) { done(err) }
      else { done(null, data) }
    });
  });
};
  
  
  
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
  
  function addUser(username) {
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


//----------- Do not edit below this line -----------//

exports.UserModel = User; // UserModel will be how it is imported in other documents such as redirectAction.js
exports.createUser = createUser;