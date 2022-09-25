import React, { useContext } from "react";
import "../Sidebar/SidebarList.css";
import "../Sidebar/Sidebar.css";
import {
  FcNightPortrait,
  FcHome,
  FcTodoList,
  FcContacts,
  FcFactory,
  FcSalesPerformance,
} from "react-icons/fc";

import { MdOutlineExplore } from "react-icons/md";
import { MdOutlinePostAdd, MdOutlineVideoLibrary } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";

import { Link } from "react-router-dom";

import { MdBiotech } from "react-icons/md";

import { MdCastForEducation } from "react-icons/md";

import { UserContext } from "../../ContextAPI/UserContext";

interface IPropsSidebarList {
  expandSidebar?: boolean;
}

const SidebarListHomePage: React.FC<IPropsSidebarList> = ({
  expandSidebar,
}) => {
  const [currentUser] = useContext(UserContext);

  return (
    <React.Fragment>
      {expandSidebar ? (
        <div className="navbar-items">
          <ul>
            <li className="nav-item">
              <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                <FcHome size={25} /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/explore"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MdOutlineExplore size={25} /> Explore
              </Link>
            </li>

            <li className="nav-item">
              {currentUser?.user ? (
                <Link
                  to={"/library"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MdOutlineVideoLibrary size={25} /> Library
                </Link>
              ) : (
                <Link
                  to={"/signin"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MdOutlineVideoLibrary size={25} /> Library
                </Link>
              )}
            </li>

            <li className="nav-item">
              {currentUser?.user ? (
                <Link
                  to={"/history"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <RiHistoryFill size={25} /> History
                </Link>
              ) : (
                <Link
                  to={"/signin"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <RiHistoryFill size={25} /> History
                </Link>
              )}
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar-items-only-icons">
          <ul>
            <li className="nav-item">
              <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                <FcHome size={25} />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/explore"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MdOutlineExplore size={25} />
              </Link>
            </li>

            <li className="nav-item">
              {currentUser?.user ? (
                <Link
                  to={"/library"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MdOutlineVideoLibrary size={25} />
                </Link>
              ) : (
                <Link
                  to={"/signin"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MdOutlineVideoLibrary size={25} />
                </Link>
              )}
            </li>

            <li className="nav-item">
              {currentUser?.user ? (
                <Link
                  to={"/history"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <RiHistoryFill size={25} />
                </Link>
              ) : (
                <Link
                  to={"/signin"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <RiHistoryFill size={25} />
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default SidebarListHomePage;
