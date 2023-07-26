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
    month: {
      type: String,
      required: true,
    },
    questionIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "questions",
      },
    ],
    quizTime: {
      type: String,
    },
    quesDeg: {
      type: String,
    },
    lang: {
      type: String,
    },
    dateUpdated: {
      type: String,
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
