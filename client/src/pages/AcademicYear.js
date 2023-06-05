import "../styles/Dashboard.css";

import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchItem from "../components/SearchItem";
import DataTable from "./../components/DataTable";

const columns = [
  { field: "id", headerName: "الرقم", width: 70 },
  { field: "name", headerName: "العام الدراسى", width: 130 },
];

const rows = [
  { id: 1, name: "Snow" },
  { id: 2, name: "Lannister" },
  { id: 3, name: "Lannister" },
  { id: 4, name: "Stark" },
  { id: 5, name: "Targaryen" },
  { id: 6, name: "Melisandre" },
  { id: 7, name: "Clifford" },
  { id: 8, name: "Frances" },
  { id: 9, name: "Roxie" },
];

function AcademicYear() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <SearchItem search={search} setSearch={setSearch} />
          <DataTable
            columns={columns}
            rows={rows.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )}
          />
        </div>
      </div>
    </>
  );
}

export default AcademicYear;
