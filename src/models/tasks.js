const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    jiraId: {
      type: String,
    },
    storyPoints: {
      type: Number,
    },
    plannedHours: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
    },
    time: {
      type: Number,
      default: true,
      validate(value) {
        if (value < 0) {
          throw new Error("Time cannot be less than 0");
        }
      },
    },
    timerUsed: {
      type: Boolean,
    },
    noTimerReason: {
      type: String,
    },
    comments: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

taskSchema.pre("save", async function () {
  const task = this;
  task.update({}, { $set: { createdAt: new Date() } });
  console.log({ task });
});

const Task = mongoose.model("Tasks", taskSchema);
module.exports = Task;
