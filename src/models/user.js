const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Task = require("./tasks");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      // validate(value) {
      //   if (!validator.isMobilePhone(value)) {
      //     throw new Error("Contact number is invalid");
      //   }
      // },
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain the word 'password'");
        }
      },
    },
    experiance: {
      type: Number,
      default: 1,
      validate(value) {
        if (value < 0) {
          throw new Error("Years cannot be less than zero");
        }
      },
    },
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.tokens;
  delete userObject.password;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisisthesecretkey");
  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentialsCustomFn = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

// Hash the plain password before saving to DB
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//Delete tasks when user is removed
userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
