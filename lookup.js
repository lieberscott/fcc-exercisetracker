let mongoose = require("mongoose");
let Exerciser = require("./newUser.js").ExerciserModel;

let lookup = function(req, res) {
  console.log("hello1");
  let id = req.query.userId; // "userId" here matches <www....&userId="> in url
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;
  
  
  async function findData(id, from, to, limit, done) {
    
    console.log("hello2");
  
    let user = await Exerciser.findById(id);
    
    console.log(user);
    
    let info = user.exercises.find( { "date": { "$gte": from.getTime(), "$lte": to.getTime() } } ).limit(limit).exec((err, data) => {
      if (err) {
        console.log(err);
        res.json({ Error: "Data not found" })
        done(err);
      }
      else {
        res.json(data);
        done(null, data);
      }
    });
    
//     , (err, data) => {
//       if (err) {
//         res.json({ Error: "ID not found" });
//         done(err);
//       }
      
      
//     });
  };
  
  findData(id, from, to, limit);

};

// let queryChain = function(done) {
//   let foodToSearch = "burrito";
  
//   let burritoLovers = Person.find({favoriteFoods: foodToSearch});
  
//   burritoLovers.sort({ name: "asc" }).limit(2).select("-age").exec((err, data) => {
//     if (err) { done(err) }
//     else { done(null, data) }
//   });
// };


//----------- Do not edit below this line -----------//

exports.lookup = lookup; // lookup will be how it is imported in other documents such as server.js