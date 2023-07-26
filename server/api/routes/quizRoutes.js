const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
const Ques = require("../models/question");
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
    // console.log(quiz);
    res.status(200).send({ data: quiz });
  } catch (error) {}
});

router.post("/quiz-details", requireAuth, async (req, res) => {
  try {
    // console.log("quiz details");
    const quiz = await Quiz.findOne({ _id: req.body.id })
      .populate("academicYearId")
      .populate("subjectId")
      .populate("questionIds");
    // console.log(quiz);
    res.status(200).send({ data: quiz });
  } catch (error) {}
});

router.post("/create", requireAuth, (req, res) => {
  // console.log(req.body);
  const quiz = new Quiz({
    academicYearId: req.body.year,
    month: req.body.month,
    subjectId: req.body.subject,
    quizTime: req.body.quizTime,
    dateAdded: new Date().toLocaleDateString("ar-EG", options),
  });

  quiz.save().then((data) => {
    // console.log(data);
    res.status(200).send({ message: "تم إضافة إمتحان بنجاح", data: data });
  });
});

router.patch("/update", requireAuth, (req, res) => {});

router.delete("/delete", requireAuth, async (req, res) => {
  // db.yourCollectionName.remove({ _id : { $in: [yourObjectId1, yourObjectId2, yourObjectId3)] } });

  // Model.deleteMany({ _id: { $in: [yourObjectId1, yourObjectId2, yourObjectId3)] } });

  // console.log(req.body);
  try {
    const quiz = await Quiz.findOne({ _id: req.body._id });
    if (quiz) {
      // console.log("quiz befor delete", quiz);
      const quizDelete = await Quiz.deleteOne({ _id: req.body._id });
      // console.log("ques's Id's", quiz.questionIds);
      // console.log("deleted Quiz", quizDelete);
      const deleteQuestions = await Ques.deleteMany({
        _id: { $in: [...quiz.questionIds] },
      });
      // console.log("deleteQues's", deleteQuestions);
      const quizzes = await Quiz.find({});
      // console.log("quizzes after Delete", quizzes);
      res.status(200).send({ message: "تم الحذف بنجاح", data: quizzes });
    } else {
      res.send({ message: "لم يتم الحذف" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
