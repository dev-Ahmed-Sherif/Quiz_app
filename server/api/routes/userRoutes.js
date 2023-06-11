const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { requireAuth } = require("../middleware/authMiddleware");
require("dotenv").config();

// Creation of Authentication Token

const maxAge = 24 * 60 * 60 * 30; // milli sec

// expiresIn receive milli sec

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

router.get("/", requireAuth, async (req, res) => {
  try {
    // console.log("loged");
    const users = await User.find({});
    console.log(users);
    res.status(200).send({ data: users });
  } catch (error) {}
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ name: req.body.name });
  if (user) {
    if (req.body.password == user.password) {
      // console.log(passConfirm);
      const token = createToken(user._id);

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: maxAge * 1000,
      });
      res.status(200).send({ user, token: token });
    } else {
      res.send({ message: "الباسورد غير صحيح" });
    }
  } else {
    res.send({ message: "ليس لديك حساب لدينا" });
  }
});

router.post("/create", requireAuth, (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    role: req.body.role,
    dateRegister: new Date(),
  });
  user.save().then((data) => {
    console.log(data);
    res.status(200).send({ message: "تم اضافة مستخدم جديد بنجاح", data: data });
  });
});

router.post("/create-test", (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    role: req.body.role,
    dateRegister: new Date(),
  });
  user.save().then((data) => {
    console.log(data);
    res.status(200).send({ message: "تم اضافة مستخدم جديد بنجاح", data: data });
  });
});

router.patch("/update-details", requireAuth, (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    { _id: req.body._id },
    { name: req.body.name, password: req.body.password },
    (err, data) => {
      if (err) {
        console.log(err);
        res.send({ message: "لم يتم التعديل" });
      } else {
        console.log(data);
        res.status(200).send({ message: "تم التعديل بنجاح", data: data });
      }
    }
  );
});

router.delete("/delete", requireAuth, (req, res) => {
  User.deleteOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
      res.send({ message: "لم يتم الحذف" });
    } else {
      console.log(data);
      res.status(200).send({ message: "تم الحذف بنجاح" });
    }
  });
});

module.exports = router;
