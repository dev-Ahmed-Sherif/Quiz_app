import React, { useEffect } from "react";
import "../styles/Dashboard.css";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchCom from "./../components/SearchCom";

function Users() {
  useEffect(() => {
    function preback() {
      window.history.forward();
    }
    setTimeout(preback(), 0);
    window.onunload = function () {
      return null;
    };
  });
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

export default Users;
