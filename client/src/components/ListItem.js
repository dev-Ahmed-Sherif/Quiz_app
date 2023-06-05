import React from "react";
import { Link } from "react-router-dom";

function ListItem({
  position,
  selectedLink,
  handleLinkClick,
  to,
  linkText,
  icon,
}) {
  if (position === "sidebar") {
    return (
      <>
        <li
          className={selectedLink === linkText ? "active" : ""}
          onClick={() => handleLinkClick(linkText)}
        >
          <Link to={to}>
            <span className="icon">{icon}</span>
            <span className="title"> {linkText} </span>
          </Link>
        </li>
      </>
    );
  } else if (position === "topbar") {
  }
}

export default ListItem;
