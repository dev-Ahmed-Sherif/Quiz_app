const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    academicYearId: {
      type: mongoose.Types.ObjectId,
      ref: "academicyears",
      required: true,
    },
    subjectId: {
      type: mongoose.Types.ObjectId,
      ref: "subjects",
      required: true,
    },
    questionIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "questions",
      },
    ],
    type: {
      type: String,
      required: true,
    },
    dateAdded: {
      type: String,
    },
  },
  {
    versionKey: false,
    strict: false,
  }
);

quiz = mongoose.model("quizzes", quizSchema);
module.exports = quiz;
