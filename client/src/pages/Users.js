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
            <Link to={`/users-dashboard/user-details/${params.row._id}`}>
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

  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([{ _id: "" }]);

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
      console.log(options);
      // console.log(rows);
    } catch (error) {}
  };

  const getUsersData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_USERS_URI_BACK}`,
        { withCredentials: true }
      );
      // console.log(data.data);

      setRows([...data.data]);
      console.log(rows);
    } catch (error) {}
  };

  useEffect(() => {
    function preback() {
      window.history.forward();
    }
    setTimeout(preback(), 0);
    window.onunload = function () {
      return null;
    };
  });

  useEffect(() => {
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
    if (values.year === "") {
      setErrorMsg("يجب اختيار العام الدراسى");
    } else {
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
        console.log(res);
        if (res.status === 200) {
          notfyAdd();
          setRows((prev) => [...prev, res.data.data]);
          setValues({ username: "", password: "", year: "-1" });
        }
      } catch (error) {}
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
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
    } catch (error) {}
  };

  const onChange = (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrorMsg(undefined);
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
            <SearchItem
              pattern={pattern}
              search={search}
              setSearch={setSearch}
            />
          </div>
          <DataTable
            columns={columns}
            rows={rows.filter((item) => {
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
