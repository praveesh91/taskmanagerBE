const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();

// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }
    const db = client.db(databaseName);
    // db.collection("usersOne").insertOne(
    //   {
    //     _id: id,
    //     name: "John",
    //     age: 23,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert result");
    //     }
    //     console.log(result);
    //   }
    // );

    db.collection("usersMany").insertMany(
      [
        {
          description: "Do the homework",
          completed: true,
        },
        {
          description: "Do the workout",
          completed: true,
        },
        {
          description: "Dinner",
          completed: true,
        },
        {
          description: "Assignments",
          completed: true,
        },
        {
          description: "Cook the lunch",
          completed: false,
        },
      ],
      (err, res) => {
        if (err) {
          return console.log(err);
        }
        console.log(res);
      }
    );

    // db.collection("tasks").findOne(
    //   {
    //     _id: new ObjectID("60fd10d874bb3a879d4f0ce2"),
    //     description: "Cook the lunch",
    //     completed: true,
    //   },
    //   (err, res) => {
    //     if (err) {
    //       return console.log({ err });
    //     }
    //     if (res) console.log({ res });
    //     else console.log("Unable to fetch");
    //   }
    // );
    // db.collection("tasks")
    //   .find({
    //     description: "Cook the lunch",
    //   })
    //   .count((err, res) => {
    //     if (err) {
    //       return console.log({ err });
    //     }
    //     if (res) console.log({ res });
    //     else console.log("Unable to fetch");
    //   });
    // const updateOnePromise = db.collection("tasks").updateOne(
    //   {
    //     _id: new ObjectID("60fd5d373056eac9570f76a2"),
    //   },
    //   {
    //     $set: {
    //       description: "Fourth updated description",
    //       completed: false,
    //     },
    //   }
    // );
    // updateOnePromise
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log(e));

    // const incAge = db.collection("usersOne").updateOne(
    //   { _id: new ObjectID("60fd534d2a842896ba8a8eaf") },
    //   {
    //     $inc: {
    //       age: 90,
    //     },
    //   }
    // );
    // incAge.then((res) => console.log(res)).catch((e) => console.log(e));

    // const updateManyPromise = db.collection("tasks").updateMany(
    //   {
    //     completed: false,
    //   },
    //   {
    //     $set: {
    //       completed: true,
    //     },
    //   }
    // );
    // updateManyPromise
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log(e));

    db.collection("usersMany")
      .deleteMany({
        completed: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
);
