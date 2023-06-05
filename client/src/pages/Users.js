import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Dashboard.css";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchItem from "./../components/SearchItem";
import DataTable from "./../components/DataTable";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const columns = [
  { field: "id", headerName: "الرقم", width: 70 },
  { field: "name", headerName: "الأسم", width: 130 },
  {
    field: "action",
    headerName: "",
    sortable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/user-dashboard/" + params.row.id}>
            <button className="edit"> Edit </button>
          </Link>
          <DeleteIcon
            className="delete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      );
    },
  },
];

const rows = [
  { id: 1, name: "على" },
  { id: 2, name: "احمد" },
  { id: 3, name: "كريم" },
  { id: 4, name: "عبدالله" },
  { id: 5, name: "احمد" },
  { id: 6, name: "كريمه" },
  { id: 7, name: "هاجر" },
  { id: 8, name: "زينب" },
  { id: 9, name: "على" },
];

const handleDelete = (id) => {};

function Users() {
  const [search, setSearch] = useState("");
  useEffect(() => {
    function preback() {
      window.history.forward();
    }
    setTimeout(preback(), 0);
    window.onunload = function () {
      return null;
    };
  });

  // useEffect(() => {
  //   let ele = document.getElementsByClassName(
  //     "css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar"
  //   );
  //   console.log(ele);
  //   console.log(ele[0].children[1].innerHTML);
  //   ele[0].children[1].innerHTML = ": عدد الصفوف المتاحة";
  // }, []);

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <SearchItem />
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}

export default Users;
