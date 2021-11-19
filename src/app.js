const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["*", "http://localhost:3001", "http://localhost:3002"],
  })
);
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// app.post("/tasks", async (req, res) => {
//   const task = new Task(req.body);
//   try {
//     await task.save();
//     await res.status(201).send("Task created");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.patch("/task/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "description", "completed", "time"];
//   const isValidUpdate = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidUpdate) {
//     return res.status(404).send({ error: "Invalid updates!!" });
//   }
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res.status(404).send();
//     }
//     res.send(task);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     await res.send(tasks);
//   } catch (error) {
//     res.status(500).send("Unable to fetch tasks");
//   }
// });

// app.get("/task/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const task = await Task.findById(_id);
//     await res.send(task);
//   } catch (error) {
//     res.status(500).send("Task not found");
//   }
// });

// app.delete("/task/:id", async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);
//     if (!task) {
//       return res.status(400).send();
//     }
//     res.send(task);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.post("/users", async (req, res) => {
//   const user = new User(req.body);
//   try {
//     await user.save();
//     await res.status(400).send("User saved success");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "password", "age"];
//   const isValidUpdate = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidUpdate) {
//     return res.status(404).send({ error: "Invalid updates!!" });
//   }
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     await res.send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     await res.send(user);
//   } catch (error) {
//     res.status(500).send("User not found");
//   }
// });

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     console.log(user);
//     if (!user) {
//       return res.status(400).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = app;
