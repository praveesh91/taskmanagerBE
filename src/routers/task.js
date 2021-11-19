const express = require("express");
const moment = require("moment");
const auth = require("../middlewares/auth");
require("../db/mongoose");
const Task = require("../models/tasks");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    await res.status(201).send("Task created");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/task/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "completed", "time"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(404).send({ error: "Invalid updates!!" });
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const match = {};
    const sort = {};
    console.log(req.query);
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "asc" ? 1 : -1;
    }
    // await req.user
    //   .populate({
    //     path: "tasks",
    //     match,
    //     options: {
    //       limit: parseInt(req.query.limit),
    //       skip: parseInt(req.query.skip),
    //     },
    //   })
    //   .execPopulate();
    // res.send(req.user.tasks);
    // console.log(match);
    // console.log(sort);

    const task = await Task.find({
      owner: req.user._id,
      // completed: req.query.completed,
    })
      // .limit(parseInt(req.query?.limit))
      // .skip(parseInt(req.query?.skip))
      .sort(sort);
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to fetch tasks");
  }
});

router.get("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    console.log({ task });
    if (!task) {
      return res.status(404).send();
    }
    await res.send(task);
  } catch (error) {
    res.status(500).send("Task not found");
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(400).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/reports", auth, async (req, res) => {
  try {
    let { startDate, endDate } = req.query;
    // const reports = await Task.find({
    //   timestamp: {
    //     $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
    //     $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
    //   },
    //   updatedAt: new Date("24 Feb 2016").getTime() / 1000,
    // });

    console.log({ reports });

    if (!reports) {
      return res.status(404).json({
        status: "failure",
        message: "Could not retrieve reports",
      });
    }

    res.status(200).json({
      status: "success",
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      error: error.message,
    });
  }
});

module.exports = router;
