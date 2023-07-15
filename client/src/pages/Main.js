import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import axios from "axios";
import { setUser } from "../redux/user_reducer";
import "../styles/Main.css";

export default function Main() {
  // Prevent Browser Back Button
  useEffect(() => {
    function preback() {
      window.history.forward();
    }
    setTimeout(preback(), 0);
    window.onunload = function () {
      return null;
    };

    // Remove Local Storge
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("Name");
    window.localStorage.removeItem("academicYear");
    window.localStorage.removeItem("quizzesResult");
  });

  const QUIZ_URI_LOGIN_BACK = "/api/users/login";
  const QUIZ_URI_HOME = "/quizzes-student";
  const DASH_URI_HOME = "/users-dashboard";

  // const userNameRef = useRef(null);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState(undefined);
  const dispatch = useDispatch();

  const inputs = [
    {
      id: "1",
      name: "username",
      type: "text",
      placeholder: "الأسم",
      pattern: `^[A-Za-z0-9\\s\u0600-\u06FF]{3,20}$`,
      errorMsg: "الأسم يجب الإ يقل عن أربعه احرف ولا يحتوى على رموز",
      required: true,
    },
    {
      id: "2",
      name: "password",
      type: "password",
      placeholder: "كلمة المرور",
      pattern: `^[A-Za-z0-9\u0600-\u06FF]{3,20}$`,
      errorMsg: "الباسورد لايجب ان يحتوى على رموز",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    // console.log("clicked");
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${QUIZ_URI_LOGIN_BACK}`,
        {
          name: values.username,
          password: values.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);

      // Check res Message
      setErrorMsg(res.data.message);

      // Check User Role
      const role = res.data.user.role;
      // console.log(role);

      if (role === "admin") {
        dispatch(setUser(res.data.user));
        window.localStorage.setItem("Name", JSON.stringify(res.data.user.name));
        navigate(DASH_URI_HOME);
      } else if (role === "student") {
        dispatch(setUser(res.data.user));
        window.localStorage.setItem("id", JSON.stringify(res.data.user._id));
        window.localStorage.setItem("Name", JSON.stringify(res.data.user.name));
        window.localStorage.setItem(
          "academicYear",
          JSON.stringify(res.data.user._id)
        );
        window.localStorage.setItem(
          "quizzesResult",
          JSON.stringify(res.data.user.result)
        );
        navigate(QUIZ_URI_HOME);
      }
    } catch (error) {}
  };

  const onChange = (e) => {
    // console.log(e.target);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <img src="./logo.jpeg" alt="" />
      <h1 style={{ color: "#5a8eff" }}> إختبارات </h1>
      <img src="./exams.png" alt="" />

      <form id="form" className="form-grid start" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            className="userid"
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="btn">تسجيل الدخول</button>
      </form>

      {errorMsg !== undefined ? <p> {errorMsg} </p> : <p></p>}
    </div>
  );
}
