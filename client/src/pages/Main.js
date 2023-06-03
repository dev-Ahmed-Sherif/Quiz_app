import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/result_reducer";
import "../styles/Main.css";
import FormInput from "../components/FormInput";

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
  });

  const QUIZ_URI_LOGIN_BACK = "/api/users/login";
  const QUIZ_URI_HOME = "/quiz";
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
      pattern: `^[A-Za-z0-9\\s]{3,20}$`,
      errorMsg: "الأسم يجب الإ يقل عن أربعه احرف ولا يحتوى على رموز",
      required: true,
    },
    {
      id: "2",
      name: "password",
      type: "password",
      placeholder: "كلمة المرور",
      pattern: `^[A-Za-z0-9]{3,20}$`,
      errorMsg: "الباسورد لابد ان يحتوى على حرف واحد ورقم واحد على الأقل",
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

      console.log(role);
      if (role === "admin") {
        dispatch(setUser(values));
        navigate(DASH_URI_HOME);
      } else if (role === "student") {
        dispatch(setUser(values));
        navigate(QUIZ_URI_HOME);
      }
    } catch (error) {}
    const data = new FormData(e.target);
  };

  const onChange = (e) => {
    // console.log(e.target);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const startQuiz = () => {
  //   console.log(values);
  //   dispatch(setUser(values));
  //   console.log(inputRef.current);
  //   if(inputRef.current?.value){
  //     dispatch(setUserId(inputRef.current?.value))
  //   }
  // };

  return (
    <div className="container">
      <img src="./logo.jpeg" alt="" />
      <h1 style={{ color: "#5a8eff" }}> إختبارات </h1>
      <img src="./exams.png" alt="" />
      {/* <h1 className='title text-light'>Quiz Application</h1>

        <ol>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol> */}

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
      {/* <div className="start">
        <Link className="btn" to={"/quiz"} onClick={startQuiz}>
          تسجيل الدخول
        </Link>
      </div> */}
    </div>
  );
}
