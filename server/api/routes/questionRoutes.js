const express = require("express");
const router = express.Router();
const Ques = require("../models/question");
const Quiz = require("../models/quiz");
const { requireAuth } = require("../middleware/authMiddleware");

let options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

// router.get("/", requireAuth, (req, res) => {
//   Ques.find((err, data) => {
//     if (err) {
//       res.send({ message: "لا يوجد بيانات" });
//     }
//     res.sendStatus(200).send({ data: data });
//   });
// });

router.get("/", async (req, res) => {
  try {
    // console.log("loged");
    const questions = await Ques.find({});
    console.log(questions);
    res.status(200).send({ data: questions });
  } catch (error) {}
});

router.post("/create", requireAuth, async (req, res) => {
  const ques = new Ques({
    question: req.body.question,
    options: req.body.options,
    answer: req.body.answer,
    dateAdded: new Date().toLocaleDateString("ar-EG", options),
  });

  ques.save().then((data) => {
    // console.log(data);
  });

  const quiz = await Quiz.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: {
        questionIds: ques._id,
      },
    }
  );
  if (quiz) {
    const updatedQuiz = await Quiz.findOne({ _id: req.body.id })
      .populate("questionIds")
      .populate("academicYearId")
      .populate("subjectId");
    // console.log(updatedQuiz);
    res
      .status(200)
      .send({ message: "تم إضافة السؤال بنجاح", data: updatedQuiz });
  } else {
    res.status(200).send({ message: "حدث خطأ فى إضافة السؤال" });
  }
});

router.patch("/update", requireAuth, (req, res) => {});

router.delete("/delete", requireAuth, async (req, res) => {
  try {
    const ques = await Ques.deleteOne({ _id: req.body.quesId });
    if (ques) {
      // console.log(ques);
      const quiz = await Quiz.findOneAndUpdate(
        { _id: req.body.quizId },
        {
          $pull: {
            questionIds: ques._id,
          },
        }
      );
      // console.log(quiz);
      const quizUpdated = await Quiz.findOne({ _id: req.body.quizId })
        .populate("academicYearId")
        .populate("subjectId")
        .populate("questionIds");
      res.status(200).send({ message: "تم الحذف بنجاح", data: quizUpdated });
    } else {
      res.send({ message: "لم يتم الحذف" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
