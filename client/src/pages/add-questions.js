import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Stack, Typography } from "@mui/material";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import "../styles/Dashboard.css";
import DataTable from "../components/DataTable";

function AddQuestions() {
  const GET_QUIZ_URI_BACK = "/api/quizzes/quiz-details";
  const ADD_QUES_URI_BACK = "/api/questions/create";

  const { _id } = useParams();

  // Quiz Details
  const [quiz, setQuiz] = useState({
    academicYear: "",
    subject: "",
    month: "",
    questions: [],
    dateAdded: "",
  });

  // Questions Details
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  console.log(question);

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    // console.log("start get user");
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_QUIZ_URI_BACK}`,
        {
          id: _id,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data.data);
      setQuiz({
        academicYear: data.data.academicYearId.name,
        subject: data.data.subjectId.name,
        month: data.data.month,
        questions: [...data.data.questionIds],
        dateAdded: data.data.dateAdded,
      });

      // console.log(exams);
    } catch (error) {}
  };

  const onChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const onChangeOption = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const onAddOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
  };

  const onRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const quiz = {
      question,
      options,
      answer,
    };

    console.log(quiz);

    // TODO: Add API call to insert quiz
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${ADD_QUES_URI_BACK}`,
        {
          id: _id,
          question: question,
          options: options,
          answer: answer,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data.data);

      setQuiz({
        academicYear: data.data.academicYearId.name,
        subject: data.data.subjectId.name,
        month: data.data.month,
        questions: [...data.data.questionIds],
        dateAdded: data.data.dateAdded,
      });

      // Reset Values
      setQuestion("");
      setOptions([""]);
      setAnswer("");

      // console.log(exams);
    } catch (error) {}
  };

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <Typography fontWeight="bold" fontSize="2em" color="blue">
            بيانات الاختبار
          </Typography>
          <Stack
            sx={{
              padding: "2em",
              margin: "1em 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid blue",
              borderRadius: "21px",
            }}
          >
            <Typography fontWeight="bold">{quiz.academicYear}</Typography>
            <Typography fontWeight="bold">{quiz.subject}</Typography>
            <Typography fontWeight="bold"> {quiz.month} </Typography>
            <Typography fontWeight="bold">
              تاريخ الأنشاء : {quiz.dateAdded}
            </Typography>
          </Stack>
          <Typography fontWeight="bold" fontSize="2em" color="blue">
            إضافة الأسئلة
          </Typography>
          <form onSubmit={onSubmit} className="add-item">
            <div className="form-group">
              <label> : السؤال </label>
              {/* <input
                type="text"
                className="form-control"
                value={question}
                onChange={onChangeQuestion}
              /> */}
              <CKEditor
                editor={ClassicEditor}
                data={question}
                // onReady={(editor) => {
                //   // You can store the "editor" and use when it is needed.
                //   console.log("Editor is ready to use!", editor);
                // }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // console.log({ event, editor, data });
                  setQuestion(data);
                }}
              />

              {/* <textarea
                style={{
                  height: "151px",
                  width: "402px",
                  direction: "rtl",
                  fontSize: "xx-large",
                }}
                className="form-control"
                placeholder="السوال"
                value={question}
                onChange={onChangeQuestion}
              /> */}
            </div>
            <div className="form-group-update">
              <div className="first">
                {options.map((option, index) => (
                  <div key={index} className="input-group mb-3">
                    <div className="form-group">
                      <label>: الاختيار </label>
                      <input
                        type="text"
                        className="form-control"
                        value={option}
                        onChange={(e) => onChangeOption(e, index)}
                      />
                    </div>
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => onRemoveOption(index)}
                      >
                        حذف الاختيار
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={onAddOption}
              >
                أضف اختيار
              </button>
            </div>
            <div className="form-group">
              <label>: الأجابة </label>
              <input
                type="text"
                className="form-control"
                value={answer}
                onChange={onChangeAnswer}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="أضف السؤال"
                className="btn btn-primary"
              />
            </div>
          </form>
          {/* <DataTable /> */}
        </div>
      </div>
    </>
  );
}

export default AddQuestions;
