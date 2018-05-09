let mongoose = require("mongoose");
let Exerciser = require("./newUser.js").ExerciserModel;

let lookup = function(req, res) {
  let id = req.query.userId; // "userId" here matches <www....&userId="> in url
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;
  
  
  let findData = function(id, from, to, limit, done) {
  
    Exerciser.findById(id, (err, data) => {
      if (err) {
        res.json({ Error: "ID not found" });
        done(err);
      }
      
      
    });
  };
  
  findData(id, from, to, limit);

};


//----------- Do not edit below this line -----------//

exports.lookup = lookup; // addExercise will be how it is imported in other documents such as server.js