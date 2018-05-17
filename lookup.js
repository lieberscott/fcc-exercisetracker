let mongoose = require("mongoose");
let Exerciser = require("./newUser.js").ExerciserModel;

let lookup = function(req, res) {
  let id = req.query.userid; // "userId" here matches <www....&userId="> in url
  
  let from = req.query.from;
  let arrfrom = from.split("-");// || new Date();
  let fromyear = parseInt(arrfrom[0]);
  let frommonth = parseInt(arrfrom[1]) - 1;
  let fromday = parseInt(arrfrom[2]);
  let fromdate = new Date(fromyear, frommonth, fromday);
  
  let to = req.query.to;
  let arrto = to.split("-") || new Date();
  let toyear = parseInt(arrto[0]);
  let tomonth = parseInt(arrto[1]) - 1;
  let today = parseInt(arrto[2]);
  let todate = new Date(toyear, tomonth, today);
  
  
  let limit = parseInt(req.query.limit);

  
  async function findData(id, from, to, limit, done) {
    
    let user = Exerciser.aggregate([
      // Got info here: https://stackoverflow.com/questions/3985214/retrieve-only-the-queried-element-in-an-object-array-in-mongodb-collection
      { $match: { "username": id }},
      { $project: { // $project passes along the documents with the requested fields to the next stage in the pipeline
          exercises: { $filter: {
            input: "$exercises",
            as: "exercise",
            cond: { $and: [
              { $lte: [ "$$exercise.date", to ] },
              { $gte: [ "$$exercise.date", from ] },
            ]}
          }},
        username: 1,
        _id: 0
      }}
    ])
    .exec((err, data) => {

      data = {
        ...data[0],
        exercises: data[0].exercises.slice(0, limit)
      };

      if (err) {
        console.log(err);
        res.json({ Error: "Data not found" })
        return done(err);
      }
      else {
        console.log(data);
        res.json(data);
        return done(null, data);
      }
    });
  };
  findData(id, fromdate, todate, limit);

};

//----------- Do not edit below this line -----------//

exports.lookup = lookup; // lookup will be how it is imported in other documents such as server.js