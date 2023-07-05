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

// Time Options

let options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

router.get("/", requireAuth, async (req, res) => {
  try {
    // console.log("loged");
    const users = await User.find({ role: { $eq: "student" } });
    // console.log(users);
    res.status(200).send({ data: users });
  } catch (error) {}
});

router.post("/get-user", requireAuth, async (req, res) => {
  console.log("loged get user");
  console.log(req.body);
  try {
    const user = await User.findOne({ _id: req.body.id }).populate(
      "academicYearId"
    );
    console.log(user);
    res.status(200).send({ data: user });
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
    academicYearId: req.body.year,
    dateRegister: new Date().toLocaleDateString("ar-EG", options),
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
    dateRegister: new Date().toLocaleDateString("ar-EG", options),
  });
  user.save().then((data) => {
    console.log(data);
    res.status(200).send({ message: "تم اضافة مستخدم جديد بنجاح", data: data });
  });
});

router.patch("/update-details", requireAuth, async (req, res) => {
  console.log(req.body);
  const user = await User.findOneAndUpdate(
    { _id: req.body.id },
    {
      name: req.body.name,
      password: req.body.password,
      academicYearId: req.body.year,
      dateUpdate: new Date().toLocaleDateString("ar-EG", options),
    }
  );
  // console.log(user);
  if (user) {
    const updatedUser = await User.findOne({ _id: req.body.id }).populate(
      "academicYearId"
    );
    console.log(updatedUser);
    res.status(200).send({ message: "تم التعديل بنجاح", data: updatedUser });
  } else {
    res.status(200).send({ message: "هذا الشخص لا يوجد له سجل" });
  }
});

router.post("/update-user-result", requireAuth, async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.body.user }, {});
  if (user) {
    const updatedUser = await User.findOne({ _id: req.body.user });
  } else {
  }
});

router.delete("/delete", requireAuth, async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.body._id });
    if (user) {
      // console.log(user);
      const users = await User.find({ role: { $eq: "student" } });
      res.status(200).send({ message: "تم الحذف بنجاح", data: users });
    } else {
      res.send({ message: "لم يتم الحذف" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
