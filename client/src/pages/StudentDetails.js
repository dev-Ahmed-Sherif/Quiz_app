import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import "../styles/Dashboard.css";
import "react-toastify/dist/ReactToastify.css";

import imageName from "../img/person.JPG";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import FormInput from "../components/FormInput";

const GET_USER_URI_BACK = "/api/users/get-user";
const UPDATE_URI_BACK = "/api/users/update-details";
const GET_ACADYEAR_URI_BACK = "/api/academic-year";
const DASH_URI_HOME = "/users-dashboard";

function GetStudent() {
  const { _id } = useParams();

  // console.log(_id);
  // console.log(typeof _id);

  // console.log(details);

  const columns = [
    { field: "_id", headerName: "الرقم", width: 70 },
    { field: "quizSubject", headerName: "أسم المادة", width: 130 },
    { field: "points", headerName: "الدرجات", width: 130 },
    {
      field: "quizTotalPoints",
      headerName: "الدرجة الكلية للأختبار",
      width: 130,
    },
    { field: "achived", headerName: "حالة الطالب", width: 130 },
    { field: "addDate", headerName: "تاريخ الألتحاق", width: 170 },
  ];

  const [values, setValues] = useState({
    username: "",
    password: "",
    year: { _id: "" },
  });

  console.log(values);

  const [options, setOptions] = useState([{ _id: "-1", name: "أختر" }]);

  const [exams, setExams] = useState([{ _id: "" }]);

  const [errorMsg, setErrorMsg] = useState(undefined);

  const inputs = [
    {
      id: "1",
      name: "username",
      type: "text",
      placeholder: "الأسم",
      pattern: `^[A-Za-z0-9\\s\u0600-\u06FF]{3,30}$`,
      errorMsg: "الأسم يجب الإ يقل عن أربعه احرف ولا يحتوى على رموز",
      required: true,
    },
    {
      id: "2",
      name: "password",
      type: "text",
      placeholder: "كلمة المرور",
      pattern: `^[A-Za-z0-9\u0600-\u06FF]{3,20}$`,
      errorMsg: "الباسورد لايجب ان يحتوى على رموز",
      required: true,
    },
  ];

  const getUserData = async () => {
    // console.log("start get user");
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_USER_URI_BACK}`,
        {
          id: _id,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data.data);
      setValues({
        username: data.data.name,
        password: data.data.password,
        year: data.data.academicYearId,
      });
      setExams([...data.data.result]);
      // console.log(exams);
    } catch (error) {}
  };

  const getYearsData = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_ACADYEAR_URI_BACK}`,
        { withCredentials: true }
      );
      // console.log(data.data);

      if (status === 200) {
        setOptions((prev) => [...prev, ...data.data]);
      }
      console.log(options);
      // console.log(rows);
    } catch (error) {}
  };

  useEffect(() => {
    // console.log("start Effect");
    getUserData();
    if (options.length === 1) {
      getYearsData();
    }
  }, []);

  const handleSubmit = async (e) => {
    // console.log("clicked");
    e.preventDefault();
    if (values.year._id === "" || values.year._id === "-1") {
      setErrorMsg("يجب اختيار العام الدراسى");
    } else {
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_SERVER_HOSTNAME}${UPDATE_URI_BACK}`,
          {
            id: _id,
            name: values.username,
            password: values.password,
            year: values.year._id,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.status === 200) {
          notfy();
          setValues({
            username: res.data.data.name,
            password: res.data.data.password,
            year: res.data.data.academicYearId,
          });
        }
      } catch (error) {}
    }
  };

  const onChange = (e) => {
    // console.log(e.target.value);
    e.target.name !== "year"
      ? setValues({ ...values, [e.target.name]: e.target.value })
      : setValues({ ...values, year: { _id: e.target.value } });
    setErrorMsg(undefined);
  };

  const notfy = () => {
    toast.info("👍👍👍 تم تعديل البيانات بنجاح", {
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
          <div className="stud-details">
            <Link to={DASH_URI_HOME}>
              <button className="btn"> الرجوع لصحفة الطلاب </button>
            </Link>
            <img src={imageName} alt="person" />

            {/* <input type="text" defaultValue={details.name} readOnly />
            <input type="text" defaultValue={details.password} /> */}
            <form
              id="form-add-student"
              className="form-student"
              onSubmit={handleSubmit}
            >
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  className="userid"
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <select
                title="select-year"
                name="year"
                value={values.year._id}
                onChange={(e) => onChange(e)}
              >
                {options.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                className="edit"
                type="submit"
                aria-label="Add Item"
                // onClick={() => inputRef.current.foucs}
              >
                تعديل البيانات
              </button>
              {errorMsg !== undefined ? (
                <p
                  style={{ color: "red", fontSize: "2em", fontWeight: "bold" }}
                >
                  {" "}
                  {errorMsg}{" "}
                </p>
              ) : (
                <p></p>
              )}
            </form>
          </div>

          <DataTable columns={columns} rows={exams} />
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

export default GetStudent;
