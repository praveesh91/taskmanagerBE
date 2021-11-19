const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {});

// const TaskSchema = new mongoose.Schema({
//   description: {
//     type: String,
//     trim: true,
//   },
//   email: {
//     type: String,
//     trim: true,
//     required: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Invalid email");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 6,
//     validate(value) {
//       if (value.includes("password")) {
//         throw new Error("Password cannot contain string password");
//       }
//     },
//   },
//   completed: {
//     type: Boolean,
//     required: true,
//   },
//   time: {
//     type: Number,
//     default: true,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Time cannot be less than 0");
//       }
//     },
//   },
// });
