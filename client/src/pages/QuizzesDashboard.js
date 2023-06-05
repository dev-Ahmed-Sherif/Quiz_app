import "../styles/Dashboard.css";

import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchItem from "./../components/SearchItem";

function QuizzesDashboard() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <SearchItem />
      </div>
    </>
  );
}

export default QuizzesDashboard;
