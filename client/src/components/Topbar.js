import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Action from "../redux/link_reducer";
import ListItem from "./ListItem";
import LogoutIcon from "@mui/icons-material/Logout";

import imageName from "../img/person.png";

function Topbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let menuRef = useRef();

  const name = useSelector((state) => state.result.userName);

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
    dispatch(Action.setLink("الطلاب"));
    navigate("/");
  };

  return (
    <div className="topbar">
      {/* <div className="toggle">
        <ion-icon name="menu"></ion-icon>
      </div> */}

      {/* <!-- search  --> */}
      {/* <div className="search">
        <label htmlFor="">
          <input type="text" name="" id="" placeholder="Search here" />
          <ion-icon name="search"></ion-icon>
        </label>
      </div> */}

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
            <h4>logout</h4>
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
