import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Action from "../redux/link_reducer";
import axios from "axios";
import ListItem from "./ListItem";
import LogoutIcon from "@mui/icons-material/Logout";

import imageName from "../img/person.png";

function Topbar() {
  const LOGOUT_URI_BACK = "/api/users/logout";

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let menuRef = useRef();

  const name = useSelector((state) => state.user.userName);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.setItem("link", JSON.stringify("الطلاب"));
    window.localStorage.removeItem("Name");
    window.localStorage.removeItem("result");
    dispatch(Action.setLink("الطلاب"));
    logoutUser();
  };

  const logoutUser = async () => {
    console.log("logout");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${LOGOUT_URI_BACK}`
      );

      console.log(res);

      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="topbar">
      {/* <!-- UserImg --> */}
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img src={imageName} alt="" />
        </div>

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <h3>
            {name}
            <br />
          </h3>
          <button onClick={(e) => handleLogout(e)}>
            <h4>تسجيل الخروج</h4>
            <LogoutIcon />
          </button>
          <ul>
            <ListItem position="topbar" text={"My Profile"} />
            <ListItem position="topbar" text={"Edit Profile"} />
          </ul>
        </div>
      </div>
      {/* <div className="user">
        <img src="./person.JPG" alt="" />
      </div> */}
    </div>
  );
}

export default Topbar;
