import "../styles/Dashboard.css";

import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchCom from "./../components/SearchCom";
import DataTable from "./../components/DataTable";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "academicYear", headerName: "First name", width: 130 },
];

const rows = [
  { id: 1, academicYear: "Snow" },
  { id: 2, academicYear: "Lannister" },
  { id: 3, academicYear: "Lannister" },
  { id: 4, academicYear: "Stark" },
  { id: 5, academicYear: "Targaryen" },
  { id: 6, academicYear: "Melisandre" },
  { id: 7, academicYear: "Clifford" },
  { id: 8, academicYear: "Frances" },
  { id: 9, academicYear: "Roxie" },
];

function AcademicYear() {
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

export default AcademicYear;
