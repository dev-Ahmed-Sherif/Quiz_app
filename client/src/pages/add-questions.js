import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { ToastContainer, toast } from "react-toastify";
import { Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";

import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { useSelector, useDispatch } from "react-redux";
import Questions from "../components/Questions";

function AddQuestions() {
  const GET_QUIZ_URI_BACK = "/api/quizzes/quiz-details";
  const ADD_QUES_URI_BACK = "/api/questions/create";
  const DELETE_URI_BACK = "/api/questions/delete";

  const { _id } = useParams();

  const dispatch = useDispatch();

  const columns = [
    { field: "_id", headerName: "الرقم", width: 70 },
    { field: "question", headerName: "السؤال", width: 130 },
    { field: "answer", headerName: "الأجابة", width: 130 },
    { field: "dateAdded", headerName: "أخر تعديل", width: 230 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 260,
      renderCell: (params) => {
        return (
          <div className="table">
            {/* <Link to={`/users-dashboard/user-details/${params.row._id}`}>
              <button className="edit"> تعديل  </button>
            </Link> */}
            <button>
              <DeleteIcon
                className="delete"
                onClick={() => handleDelete(params.row._id)}
              />
            </button>
          </div>
        );
      },
    },
  ];

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
  const [options, setOptions] = useState([]);
  console.log(question);

  const [answer, setAnswer] = useState("");

  const [errorMsg, setError] = useState("");

  useEffect(() => {
    getQuizData();
  }, []);

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${DELETE_URI_BACK}`,
        {
          data: { quesId: id, quizId: _id },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(res);
      notfyDelete();
      setQuiz({
        academicYear: data.data.academicYearId.name,
        subject: data.data.subjectId.name,
        month: data.data.month,
        questions: [...data.data.questionIds],
        dateAdded: data.data.dateAdded,
      });
    } catch (error) {}
  };

  const notfyDelete = () => {
    toast.info("👍👍👍 تم حذف السؤال بنجاح", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const { questions, trace } = useSelector((state) => state.quiz);

  function onNext() {
    if (trace < questions.length) {
      /** increase the trace value by one using MoveNextAction */
      dispatch(MoveNextQuestion());

      /** insert a new result in the array.  */
    } else {
      setError("يجب الاجابة على السؤال");
    }

    /** reset the value of the checked variable */
  }

  /** Prev button event handler */
  function onPrev() {
    if (trace > 0) {
      /** decrease the trace value by one using MovePrevQuestion */
      dispatch(MovePrevQuestion());
    }
  }

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

    if (question === "" && options.length === 0 && answer === "") {
      setError("يرجى إدخال بيانات السؤال كاملة");
    } else {
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
        setOptions([]);
        setAnswer("");
        setError("");

        notfyAdd();

        // console.log(exams);
      } catch (error) {}
    }
  };

  const notfyAdd = () => {
    toast.info("👍👍👍 تم إضافة السؤال بنجاح", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
          <Modal title="الأختبار">
            <Questions onPrev={onPrev} onNext={onNext} />
          </Modal>
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
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // console.log({ event, editor, data });
                  setQuestion(data);
                }}
              />
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
              <input type="submit" value="أضف السؤال" className="add-ques" />
            </div>
          </form>
          {errorMsg !== undefined ? (
            <p style={{ color: "red", fontSize: "2em", fontWeight: "bold" }}>
              {errorMsg}
            </p>
          ) : (
            <p></p>
          )}
          <DataTable columns={columns} rows={quiz.questions} />
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default AddQuestions;
