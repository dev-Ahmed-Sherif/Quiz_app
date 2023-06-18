import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";

const GET_USER_URI_BACK = "/api/users/get-user";

const DASH_URI_HOME = "/users-dashboard";

function EditStudent() {
  const { _id } = useParams();

  const [details, setDetails] = useState({
    name: "",
    password: "",
    academicYear: "",
  });

  console.log(details);

  const columns = [
    { field: "_id", headerName: "الرقم", width: 70 },
    { field: "name", headerName: "الأسم", width: 130 },
    { field: "password", headerName: "الباسورد", width: 130 },
    { field: "dateUpdate", headerName: "أخر تعديل", width: 130 },
    { field: "dateRegister", headerName: "تاريخ التسجيل", width: 200 },
  ];

  const [exams, setExams] = useState([{ _id: "" }]);

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
      setDetails({
        name: data.data.name,
        password: data.data.password,
        academicYear: data.data.academicYearId.name,
      });
      setExams([...data.data.result]);
      // console.log(exams);
    } catch (error) {}
  };

  useEffect(() => {
    // console.log("start Effect");
    getUserData();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <img src="./person.JPG" alt="person" />
          <p>{details.name}</p>
          <p>{details.password}</p>
          <p>{details.academicYear}</p>

          <DataTable columns={columns} rows={exams} />
        </div>
        <Link to={DASH_URI_HOME}>
          <button className="edit"> الرجوع للصحفة الرئيسية </button>
        </Link>
      </div>
    </>
  );
}

export default EditStudent;
