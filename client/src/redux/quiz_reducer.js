import { createSlice } from "@reduxjs/toolkit";

/** create reducer */
export const quizReducer = createSlice({
  name: "quiz",
  initialState: {
    id: "",
    year: "",
    month: "",
    subject: "",
    time: 1,
    questions: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      // console.log(action.payload);
      state.id = action.payload.quiz._id;
      state.year = action.payload.quiz.academicYearId.name;
      state.subject = action.payload.quiz.subjectId.name;
      state.month = action.payload.quiz.month;
      state.time = Number(action.payload.quiz.quizTime);
      // console.log(state.time);
      // console.log(typeof state.time);
      state.questions = action.payload.quiz.questionIds.sort(function (a, b) {
        return 0.5 - Math.random();
      });
      console.log(state.questions);
      state.answers = [...state.questions.map((t) => t.answer)];
      console.log(state.answers);
      // return {
      //   ...state,
      //   queue: questions,
      // };
    },
    moveNextAction: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    movePrevAction: (state) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    resetAllAction: () => {
      return {
        id: "",
        year: "",
        month: "",
        subject: "",
        questions: [],
        answers: [],
        trace: 0,
      };
    },
  },
});

export const {
  startExamAction,
  moveNextAction,
  movePrevAction,
  resetAllAction,
} = quizReducer.actions;

export default quizReducer.reducer;
