import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchItem from "./../components/SearchItem";
import DataTable from "./../components/DataTable";
import FormInput from "../components/FormInput";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { FaPlus } from "react-icons/fa";

const pattern = `^[A-Za-z\u0600-\u06FF\\s]{3,30}$`;

const ADD_URI_BACK = "/api/users/create";
const DELETE_URI_BACK = "/api/users/delete";
const GET_USERS_URI_BACK = "/api/users";

const GET_ACADYEAR_URI_BACK = "/api/academic-year";

const DASH_URI_HOME = "/users-dashboard";

function Users() {
  const columns = [
    { field: "_id", headerName: "الرقم", width: 70 },
    { field: "name", headerName: "الأسم", width: 130 },
    { field: "password", headerName: "الباسورد", width: 100 },
    { field: "dateUpdate", headerName: "أخر تعديل", width: 180 },
    { field: "dateRegister", headerName: "تاريخ التسجيل", width: 200 },
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
            <Link to={`/student-details/${params.row._id}`}>
              <button className="edit"> تفاصيل </button>
            </Link>
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

  // Search Options
  const [search, setSearch] = useState("");
  // console.log(search);
  const [selectedYear, setSelectedYear] = useState("-2");
  // console.log("selected year", selectedYear);
  // console.log("selected year", typeof selectedYear);

  const [rows, setRows] = useState([{ _id: "" }]);
  // console.log(rows);
  const [filterRows, setFilterRows] = useState([]);
  // console.log("filtered: ", rows);
  // console.log("users filter: ", filterRows);

  const [values, setValues] = useState({
    username: "",
    password: "",
    year: "",
  });

  const [options, setOptions] = useState([{ _id: "-1", name: "أختر" }]);

  // console.log(options);

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
      type: "password",
      placeholder: "كلمة المرور",
      pattern: `^[A-Za-z0-9\u0600-\u06FF]{3,20}$`,
      errorMsg: "الباسورد لايجب ان يحتوى على رموز",
      required: true,
    },
  ];

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
      // console.log(options);
      // console.log(rows);
    } catch (error) {}
  };

  const getUsersData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_USERS_URI_BACK}`,
        { withCredentials: true }
      );
      // console.log("res data ", data.data);
      // console.log("selected year in get user ", selectedYear);

      // if (selectedYear !== "-2" && selectedYear !== "-1") {
      //   console.log("loged");
      //   const updatedRows = rows.filter((item) => {
      //     if (item.academicYearId === selectedYear) {
      //       return item;
      //     }
      //   });
      //   setRows([...updatedRows]);
      // } else {
      //   setRows([...data.data]);
      // }
      setRows([...data.data]);
      setFilterRows([...data.data]);
      // console.log(rows);
    } catch (error) {}
  };

  useEffect(() => {
    // console.log("render always");

    function preback() {
      window.history.forward();
    }
    setTimeout(preback(), 0);
    window.onunload = function () {
      return null;
    };
  });

  useEffect(() => {
    // console.log("render");
    if (options.length === 1) {
      getYearsData();
    }
    if (rows.length === 1) {
      getUsersData();
    }
  }, []);

  const handleSubmit = async (e) => {
    // console.log("clicked");
    e.preventDefault();
    if (values.year === "" || values.year === "-1") {
      setErrorMsg("يجب اختيار العام الدراسى");
    } else {
      setSearch("");
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_HOSTNAME}${ADD_URI_BACK}`,
          {
            name: values.username,
            password: values.password,
            year: values.year,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        // console.log(res);
        if (res.status === 200) {
          notfyAdd();
          setValues({ username: "", password: "", year: "-1" });
          setRows((prev) => [...prev, res.data.data]);
          setFilterRows((prev) => [...prev, res.data.data]);
        }
      } catch (error) {}
    }
  };

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${DELETE_URI_BACK}`,
        {
          data: { _id: id },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(res);
      notfyDelete();
      setRows([...res.data.data]);
      setFilterRows([...res.data.data]);
    } catch (error) {}
  };

  const onChange = (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrorMsg(undefined);
  };

  const handleSelectedYear = (e) => {
    // if (selectedYear !== "-2") {
    // }
    // getUsersData();
    // console.log(e.target.value);
    setSelectedYear(e.target.value);
    setFilterRows([
      ...rows.filter((item) => {
        if (item.academicYearId === e.target.value) {
          return item;
        } else if (e.target.value === "-1") {
          return item;
        }
      }),
    ]);
  };

  const notfyAdd = () => {
    toast.info("👍👍👍 تم إضافة الطالب بنجاح", {
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

  const notfyDelete = () => {
    toast.info("👍👍👍 تم حذف الطالب بنجاح", {
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
          <div className="operations">
            <div className="add-item">
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
                  value={values.year}
                  onChange={(e) => onChange(e)}
                >
                  {options.map((item) => (
                    <option key={item._id} value={item._id}>
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
              </form>
              {errorMsg !== undefined ? <p> {errorMsg} </p> : <p></p>}
            </div>
            <div className="search-options">
              <h2> البحث عن الطلاب </h2>
              <h4> البحث بالسنه الدراسية </h4>
              <select
                title="select-year"
                name="year-search"
                value={selectedYear}
                onChange={(e) => handleSelectedYear(e)}
              >
                {options.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <h4> البحث بالأسم </h4>
              <SearchItem
                pattern={pattern}
                search={search}
                setSearch={setSearch}
              />
            </div>
          </div>
          <DataTable
            columns={columns}
            rows={filterRows.filter((item) => {
              if (item._id !== "") {
                return item.name.toLowerCase().includes(search.toLowerCase());
              }
            })}
          />
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

export default Users;
