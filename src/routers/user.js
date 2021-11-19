const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const auth = require("../middlewares/auth");

require("../db/mongoose");
const User = require("../models/user");

const router = new express.Router();

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentialsCustomFn(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token, message: "Logged in successfully" });
  } catch (error) {
    res.status(404).send({ message: "Invalid Credentials, Try again" });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    await user.generateAuthToken();
    await res.status(201).send("User saved success");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

const upload = multer({
  // dest: "avatars",
  // limits: {
  //   fileSize: 1000000,
  // },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Pleas upload jpg,jpeg or png images only"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  upload.single("avatar"),
  auth,
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error });
  }
);

router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error });
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

// Update any user without authentication

// router.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "password", "age"];
//   const isValidUpdate = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidUpdate) {
//     return res.status(404).send({ error: "Invalid updates!!" });
//   }
//   try {
//     // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     //   new: true,
//     //   runValidators: true,
//     // });
//     const user = await User.findById(req.params.id);
//     updates.forEach((update) => (user[update] = req.body[update]));
//     await user.save();

//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// Update only logged in user with authentication

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "experiance", "skills", "phone"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(404).send({ error: "Invalid updates!!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    await res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    await res.send(user);
  } catch (error) {
    res.status(500).send("User not found");
  }
});

// Delete any user without authentication

// router.delete("/users/:id", async (req, res) => {
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

// Delete a logged in user with authentication
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
