import "../styles/Dashboard.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchItem from "../components/SearchItem";
import AddItem from "../components/AddItem";
import DataTable from "./../components/DataTable";

const columns = [
  { field: "id", headerName: "الرقم", width: 70 },
  { field: "name", headerName: "الماة الدراسية", width: 130 },
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

function AcademicSubject() {
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");

  const pattern = `^[A-Za-z\u0600-\u06FF]{3,20}$`;

  const ADDSUBJECT_URI__BACK = "/api/subjects/create";

  const preventNumber = (e) => {
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const addItem = async (item) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${ADDSUBJECT_URI__BACK}`,
        {
          name: item,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;

    // addItem
    addItem(newItem);
    setNewItem("");
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
                label={"إضافة المادة الدراسية"}
                placeholder={"أسم المادة"}
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
            rows={rows.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )}
          />
        </div>
      </div>
    </>
  );
}

export default AcademicSubject;
