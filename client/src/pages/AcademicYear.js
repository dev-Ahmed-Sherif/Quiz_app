import "../styles/Dashboard.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchItem from "../components/SearchItem";
import AddItem from "../components/AddItem";
import DataTable from "./../components/DataTable";

const pattern = `^[A-Za-z\u0600-\u06FF\\s]{3,30}$`;

const ADD_URI_BACK = "/api/academic-year/create";
const DELETE_URI_BACK = "/api/academic-year/delete";
const GET_URI_BACK = "/api/academic-year";

function AcademicYear() {
  const columns = [
    { field: "_id", headerName: "الرقم", width: 70 },
    { field: "name", headerName: "العام الدراسى", width: 200 },
    { field: "dateAdded", headerName: "تاريخ التسجيل", width: 270 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user-dashboard/" + params.row._id}>
              <button className="edit"> تعديل </button>
            </Link>
            <button>
              <DeleteIcon
                className="delete"
                onClick={() => handleDelete(params.row._id)}
              />
            </button>
          </>
        );
      },
    },
  ];

  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [rows, setRows] = useState([{ _id: "", name: "" }]);

  useEffect(() => {
    getData();
  }, []);

  // console.log(rows);

  const preventNumber = (e) => {
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;

    // addItem
    addItem(newItem);
    setNewItem("");
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_URI_BACK}`,
        { withCredentials: true }
      );
      console.log(data.data);
      setRows([...data.data]);
      // console.log(rows);
    } catch (error) {}
  };

  const addItem = async (item) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${ADD_URI_BACK}`,
        {
          name: item,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.status === 200) {
        setRows((prev) => [...prev, res.data.data]);
      }
    } catch (error) {}
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
      console.log(res);
      setRows([...res.data.data]);
    } catch (error) {}
  };

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <div className="operations">
            <div className="add-item">
              <AddItem
                label={"إضافة العام الدراسى"}
                placeholder={"العام الدراسى"}
                pattern={pattern}
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
                onKeyPress={preventNumber}
              />
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
    </>
  );
}

export default AcademicYear;
