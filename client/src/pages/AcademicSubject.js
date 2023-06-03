import "../styles/Dashboard.css";

import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchCom from "./../components/SearchCom";
import DataTable from "./../components/DataTable";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "subject", headerName: "المادة", width: 130 },
];

const rows = [
  { id: 1, subject: "Snow" },
  { id: 2, subject: "Lannister" },
  { id: 3, subject: "Lannister" },
  { id: 4, subject: "Stark" },
  { id: 5, subject: "Targaryen" },
  { id: 6, subject: "Melisandre" },
  { id: 7, subject: "Clifford" },
  { id: 8, subject: "Frances" },
  { id: 9, subject: "Roxie" },
];

function AcademicSubject() {
  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <SearchCom />
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}

export default AcademicSubject;
