const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, async (req, res) => {
  try {
    // console.log("loged");
    const quiz = await Quiz.find({});
    console.log(quiz);
    res.status(200).send({ data: quiz });
  } catch (error) {}
});

router.post("/create", requireAuth, (req, res) => {
  const quiz = new Quiz({
    name: req.name,
    dateAdded: new Date(),
  });

  quiz.save().then((data) => {
    console.log(data);
    res.status(200).send({ message: "تم إضافة إمتحان بنجاح", data: data });
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
      res.status(200).send({ message: "تم الحذف بنجاح" });
    }
  });
});

module.exports = router;
