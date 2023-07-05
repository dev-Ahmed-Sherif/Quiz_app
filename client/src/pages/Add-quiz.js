import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

const AddQuiz = () => {
  const GET_ACADYEAR_URI_BACK = "/api/academic-year";
  const GET_SUBJECTS_URI_BACK = "/api/subjects";

  const ADD_URI_BACK = "/api/quizzes/create";

  const months = [
    { id: "-1", name: "أختر الشهر" },
    { id: "1", name: "يناير" },
    { id: "2", name: "فبراير" },
    { id: "3", name: "مارس" },
    { id: "4", name: "ابريل" },
    { id: "5", name: "مايو" },
    { id: "6", name: "يونيو" },
    { id: "7", name: "يوليو" },
    { id: "8", name: "أغسطس" },
    { id: "9", name: "سبتمبر" },
    { id: "10", name: "أكتوبر" },
    { id: "11", name: "نوفمبر" },
    { id: "12", name: "ديسمبر" },
  ];

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    subject: "",
    year: "",
    month: "",
  });

  const [acadmicYears, setAcadmicYears] = useState([
    { _id: "-1", name: "أختر العام الدراسى" },
  ]);
  const [subjects, setSubjects] = useState([
    { _id: "-1", name: "أختر المادة الدراسية" },
  ]);

  const [errorMsg, setErrorMsg] = useState(undefined);

  const getYearsData = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_ACADYEAR_URI_BACK}`,
        { withCredentials: true }
      );
      // console.log(data.data);

      if (status === 200) {
        setAcadmicYears((prev) => [...prev, ...data.data]);
      }
      // console.log(options);
      // console.log(rows);
    } catch (error) {}
  };

  const getSubjectsData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_SUBJECTS_URI_BACK}`,
        { withCredentials: true }
      );
      console.log(data.data);
      setSubjects((prev) => [...prev, ...data.data]);
      // console.log(rows);
    } catch (error) {}
  };

  const onChange = (e) => {
    // console.log(e.target.value);
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
    setErrorMsg(undefined);
  };

  useEffect(() => {
    if (acadmicYears.length === 1 || subjects.length === 1) {
      getYearsData();
      getSubjectsData();
    }
  }, []);

  const handleSubmit = async (e) => {
    // console.log("clicked");
    e.preventDefault();
    if (quiz.year === "" || quiz.year === "-1") {
      setErrorMsg("يجب اختيار العام الدراسى");
    } else if (quiz.subject === "" || quiz.subject === "-1") {
      setErrorMsg("يجب اختيار المادة الدراسية");
    } else if (quiz.month === "" || quiz.month === "أختر الشهر") {
      setErrorMsg("يجب اختيار الشهر");
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}${ADD_URI_BACK}`,
          {
            subject: quiz.subject,
            month: quiz.month,
            year: quiz.year,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        // console.log(res);
        if (res.status === 200) {
          notfyAdd();
          setQuiz({ subject: "", month: "", year: "" });
          navigate("/quizzes-dashboard");
        }
      } catch (error) {}
    }
  };

  const notfyAdd = () => {
    toast.info("👍👍👍 تم إضافة الأختبار بنجاح", {
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
          <h2 className="head">إضافة أختبار جديد</h2>
          <div className="add-item">
            <form className="form-student" onSubmit={handleSubmit}>
              <select
                title="select-year"
                name="year"
                value={quiz.year}
                onChange={(e) => onChange(e)}
              >
                {acadmicYears.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                title="select-subject"
                name="subject"
                value={quiz.subject}
                onChange={(e) => onChange(e)}
              >
                {subjects.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                title="select-month"
                name="month"
                value={quiz.month}
                onChange={(e) => onChange(e)}
              >
                {months.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                aria-label="Add Item"
                // onClick={() => inputRef.current.foucs}
              >
                <FaPlus />
              </button>
              {errorMsg !== undefined ? <p> {errorMsg} </p> : <p></p>}
            </form>
          </div>
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
};

export default AddQuiz;
