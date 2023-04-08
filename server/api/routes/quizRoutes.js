const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, (req, res) => {
  Quiz.find((err, data) => {
    if (err) {
      res.send({ message: "لا يوجد بيانات" });
    } else {
      res.sendStatus(200).send({ data: data });
    }
  });
});

router.post("/create", requireAuth, (req, res) => {
  const quiz = new Quiz({
    name: req.name,
    dateAdded: new Date(),
  });

  quiz.save().then((data) => {
    console.log(data);
    res.sendStatus(200).send({ message: "تم إضافة إمتحان بنجاح", data: data });
  });
});

router.patch("/update", requireAuth, (req, res) => {});

router.delete("/delete", requireAuth, (req, res) => {
  Quiz.deleteOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      console.log(err);
      res.send({ message: "لم يتم الحذف" });
    } else {
      console.log(data);
      res.sendStatus(200).send({ message: "تم الحذف بنجاح" });
    }
  });
});

module.exports = router;
