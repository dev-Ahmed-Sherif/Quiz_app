const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
const { requireAuth } = require("../middleware/authMiddleware");

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
    const quiz = await Quiz.find({})
      .populate("academicYearId")
      .populate("subjectId")
      .populate("questionIds");
    console.log(quiz);
    res.status(200).send({ data: quiz });
  } catch (error) {}
});

router.post("/quiz-details", requireAuth, async (req, res) => {
  try {
    // console.log("loged");
    const quiz = await Quiz.findOne({ _id: req.body.id })
      .populate("academicYearId")
      .populate("subjectId")
      .populate("questionIds");
    console.log(quiz);
    res.status(200).send({ data: quiz });
  } catch (error) {}
});

router.post("/create", requireAuth, (req, res) => {
  console.log(req.body);
  const quiz = new Quiz({
    academicYearId: req.body.year,
    month: req.body.month,
    subjectId: req.body.subject,
    quesDeg: req.body.quesDeg,
    dateAdded: new Date().toLocaleDateString("ar-EG", options),
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
