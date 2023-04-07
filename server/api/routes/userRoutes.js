const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.send({ message: "No Data" });
    }
    res.sendStatus(200).send({ data: data });
  });
});

router.get("/create", (req, res) => {
  const user = new User({
    name: "Ahmed",
    password: "123",
    role: "admin",
    dateRegister: new Date(),
  });
  user.save().then((result) => {
    console.log(result);
    res.send("New user created");
  });
});

module.exports = router;
