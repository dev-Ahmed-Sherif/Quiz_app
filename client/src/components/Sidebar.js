import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill, BsCalendarDate } from "react-icons/bs";
import { SiTestcafe } from "react-icons/si";
import { MdPlayLesson } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import * as Action from "../redux/link_reducer";

function Sidebar() {
  // const [selectedLink, setSelectedLink] = useState("الطلاب");

  const selectedLink = useSelector((state) => state.link.link);
  const dispatch = useDispatch();

  console.log(selectedLink);

  const handleLinkClick = (link) => {
    dispatch(Action.setLink(link));
    window.localStorage.setItem("link", JSON.stringify(link));
  };

  return (
    <div className="navigation">
      <ul>
        <li>
          <Link to="/users-dashboard">
            <span className="icon">
              {/* <ion-icon name="wifi-outline"></ion-icon> */}
            </span>
            {/* <span className="title"> أختبارات </span> */}
          </Link>
        </li>
        {/* <li
          className={selectedLink === "الرئيسية" ? "active" : ""}
          onClick={() => handleLinkClick("الرئيسية")}
        >
          <Link to="/">
            <spn class="icon"></spn>
            <span class="title"> الرئيسية </span>
          </Link>
          الرئيسية
        </li> */}
        <li
          className={selectedLink === "الطلاب" ? "active" : ""}
          onClick={() => handleLinkClick("الطلاب")}
        >
          <Link to="/users-dashboard">
            <span className="icon">
              <BsFillPersonFill />
            </span>
            <span className="title"> الطلاب </span>
          </Link>
        </li>
        <li
          className={selectedLink === "الأختبارات" ? "active" : ""}
          onClick={() => handleLinkClick("الأختبارات")}
        >
          <Link to="/quizzes-dashboard">
            <span className="icon">
              <SiTestcafe />
            </span>
            <span className="title"> الأختبارات </span>
          </Link>
        </li>
        <li
          className={selectedLink === "المواد الدراسية" ? "active" : ""}
          onClick={() => handleLinkClick("المواد الدراسية")}
        >
          <Link to="/academic-subjects">
            <span className="icon">
              <MdPlayLesson />
            </span>
            <span className="title"> المواد الدراسية </span>
          </Link>
        </li>
        <li
          className={selectedLink === "العام الدراسى" ? "active" : ""}
          onClick={() => handleLinkClick("العام الدراسى")}
        >
          <Link to="/academic-years">
            <span className="icon">
              <BsCalendarDate />
            </span>
            <span className="title"> العام الدراسى </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
