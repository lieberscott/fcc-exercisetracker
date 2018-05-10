let mongoose = require("mongoose");
let Exerciser = require("./newUser.js").ExerciserModel;

let lookup = function(req, res) {
  console.log("hello1");
  let id = req.query.userId; // "userId" here matches <www....&userId="> in url
  
  let from = req.query.from; // converted to milliseconds sinc Jan. 1, 1970
  let arrfrom = from.split("-");// || new Date();
  let fromyear = parseInt(arrfrom[0]);
  let frommonth = parseInt(arrfrom[1]) - 1;
  let fromday = parseInt(arrfrom[2]);
  let fromdate = new Date(fromyear, frommonth, fromday);
  
  let to = req.query.to; // converted to milliseconds since Jan. 1, 1970
  let arrto = to.split("-");// || new Date();
  let toyear = parseInt(arrto[0]);
  let tomonth = parseInt(arrto[1]) - 1;
  let today = parseInt(arrto[2]);
  let todate = new Date(toyear, tomonth, today);
  
  
  let limit = parseInt(req.query.limit);
  
  console.log(fromdate);
  console.log(todate);
  
  async function findData(id, from, to, limit, done) {
  
    let user = await Exerciser.findOne(
      { "id": id },
      { "exercises.date": { "$gte": from, "$lte": to } }
      ).exec((err, data) => {
    
    // let info = user.exercises.find( { "date": { "$gte": from, "$lte": to } } ).limit(limit).exec((err, data) => {
      if (err) {
        console.log(err);
        res.json({ Error: "Data not found" })
        return done(err);
      }
      else {
        res.json(data);
        return done(null, data);
      }
    });
    
//     , (err, data) => {
//       if (err) {
//         res.json({ Error: "ID not found" });
//         done(err);
//       }
      
      
//     });
  };
  
  findData(id, fromdate, todate, limit);

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