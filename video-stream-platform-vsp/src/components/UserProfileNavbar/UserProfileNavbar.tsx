import React from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";

import CardLayout from "../CardLayout";
import "./UserProfileNavbar.css";

interface UserProfileNavbarProps {
  slug?: string;
}

const UserProfileNavbar: React.FC<UserProfileNavbarProps> = ({ slug }) => {
  console.log("Slug is here:" + slug);

  return (
    <nav className="user-profile-nav">
      <ul>
        <li className="nav-items">
          <NavLink
            to={"/channel/" + slug}
             
            style={({ isActive }) =>
              isActive
                ? {
                    color: "black",
                    textDecoration: "none",
                    borderBottom: "3px solid black",
                  }
                : { color: "black", textDecoration: "none" }
            }
            end>
            HOME
          </NavLink>
        </li>

        <li className="nav-items">
          <NavLink
            to={"/channel/" + slug + "/video"}
            style={({ isActive }) =>
              isActive
                ? {
                    color: "black",
                    textDecoration: "none",
                    borderBottom: "3px solid black",
                  }
                : { color: "black", textDecoration: "none" }
            }
          >
            VIDEOS
          </NavLink>
        </li>

        <li className="nav-items">
          <NavLink
            to={"/channel/" + slug + "/community"}
            style={({ isActive }) =>
              isActive
                ? {
                    color: "black",
                    textDecoration: "none",
                    borderBottom: "3px solid black",
                  }
                : { color: "black", textDecoration: "none" }
            }
          >
            COMMUNITY
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserProfileNavbar;
