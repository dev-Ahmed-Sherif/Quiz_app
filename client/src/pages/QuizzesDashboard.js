import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchCom from "./../components/SearchCom";

function QuizzesDashboard() {
  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <SearchCom />
      </div>
    </>
  );
}

export default QuizzesDashboard;
